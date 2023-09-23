import {ChangeEvent, EffectCallback, memo,useEffect,useRef,useState,VFC}from"react";
import { MainButton } from "../atoms/button/MainButton";
import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Box, Flex, Input, ListItem, Stack, Textarea, UnorderedList, Wrap, WrapItem } from "@chakra-ui/react";
import { useApplications } from "../../hooks/useApplications";
import { auth, db } from "../../firebase";
import { arrayUnion, collection,doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, updateDoc, where,getFirestore, addDoc } from "firebase/firestore";
import firebase from 'firebase/app';
import { useMessages } from "../../hooks/useMessages";
import { Message } from "../../types/api/message";
import { useMessage } from "../../hooks/useMessage";
import { useOtherUsers } from "../../hooks/useOtherUsers";
import { useFriendMessages } from "../../hooks/useFriendMessages";
import { UsersMessage } from "../../types/api/usersMessage";
import { useUserMessages } from "../../hooks/useUsersMessages";
import { getAuth } from "firebase/auth";
export type AllMessage={
  key:number;
  value:string;
  userId:string;
}
export type MessageWithUserName={
  userName: string;
  value:string;
  key:number;
};

export const UserMessages: VFC = memo(()=>{
    const auth=getAuth()
    const messagesListRef = useRef<HTMLDivElement | null>(null);
    const[loading1,setLoading1]=useState<boolean>(false)
    const{login,loading}=useAuth();
    const {userId}=useParams<{ userId: string }>();
    const [friendData,setFriendData]=useState<string>("")
    const {users}=useOtherUsers();
    const history=useHistory();
    const [text,setText] =useState('');
    const {showMessage}=useMessage()
    const usersMessages:UsersMessage[]=[]
    const [messages1,setMessages1]=useState<MessageWithUserName[]>([]);
    const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>)=>setText(e.target.value);
    const {friendMessages,setFriendMessages}=useFriendMessages()
    const onClickUser=()=>history.push(`/home/user_search/result/${userId}`)
    const onClickSend=()=>{
      if (text) {
      addMessageToFirestore(text);
  }}
  useEffect(() => {
    // メッセージリストの高さを調整して、入力欄の下にメッセージが隠れないようにする
    if (messagesListRef.current) {
      messagesListRef.current.style.maxHeight = `${window.innerHeight -250 /* フッターやヘッダーの高さなどを考慮 */}px`;
    }
  }, []);
  useEffect(()=>{
    const userMessages=async(userId:string)=>{
    try{
      
      if(auth.currentUser){
      const q0=query(collection(db,"friends"),where("userid","==",auth.currentUser.uid),where("anotherid","==",userId))
      const q1=query(collection(db,"friends"),where("anotherid","==",auth.currentUser.uid),where("userid","==",userId))
      const [querySnapshot0, querySnapshot1] = await Promise.all([getDocs(q0), getDocs(q1)]);
      //const querySnapshot0=await getDocs(q0)
      //const querySnapshot1=await getDocs(q1)
      if(!querySnapshot0.empty||!querySnapshot1.empty){
          
          if(!querySnapshot0.empty){
          querySnapshot0.forEach((doc)=>{
          const friendsid=doc.id
          console.log(friendsid)
          setFriendData(friendsid)
          console.log(friendData)
          })}
          if(!querySnapshot1.empty){
              querySnapshot1.forEach((doc)=>{
                  const friendsid=doc.id
                  console.log(friendsid)
                  setFriendData(friendsid)
                  })
          }
    
      }else{
          if(auth.currentUser){
              const friends=await addDoc(collection(db,"friends"),{
                  userid:auth.currentUser.uid,
                  anotherid:userId
              })
              const friendsId=friends.id
              const messageData=await addDoc(collection(db,"friendmessages"),{
                  messages: [{key:0,value:"新しく会話を開始しました",userId:auth.currentUser?.uid}],
                  usersid:friendsId
              })
              const friendMessagesId=messageData.id
              const friendMessagesCollection = collection(db, 'friendmessages');
              const docRef = doc(friendMessagesCollection, friendMessagesId);
                      const docSnapshot = await getDoc(docRef);
                      
                      if (docSnapshot.exists()) {
                        const docData = docSnapshot.data();
                          const friendMessages=docData.messages
                          const usersId=docData.usersid
                          const usersMessagesId=docSnapshot.id
                          const data:UsersMessage={friendMessages,usersId,usersMessagesId}
                  usersMessages.push(data)
          }
          if(usersMessages.length!==0){
              setFriendMessages(usersMessages)
          }                              
      }}
     console.log(friendData)
     if(friendData){
      const q=query(collection(db,"friendmessages"),where("usersid", "==", friendData))
      const querySnapshot=await getDocs(q);
      if(!querySnapshot.empty){
          querySnapshot.forEach((doc)=>{
              const docData=doc.data();
              const friendMessages=docData.messages
              const usersId=docData.usersid
              const usersMessagesId=doc.id
              const data:UsersMessage={friendMessages,usersId,usersMessagesId}
              usersMessages.push(data)
          })}
          if(usersMessages.length!==0){
              setFriendMessages(usersMessages)
          }                              
      }else{console.log("as")}
          
  }}
            
          catch(error){
              showMessage({title:"会話データの取得に失敗しました",status:"error"});

          }
}
userMessages(userId);

},[friendData])
console.log(friendMessages)
  const findFriendMessages=friendMessages[0]
  const addMessageToFirestore = async (text:string) => {
    try {
        setLoading1(true)
      // "messages" コレクションに新しいドキュメントを追加
      if(findFriendMessages){
      const conversationRef = doc(db, "friendmessages", findFriendMessages.usersMessagesId);
      await updateDoc(conversationRef, {
        messages: arrayUnion({key:findFriendMessages.friendMessages.length,value:text,userId:auth.currentUser?.uid})
      });
      setText('')
      showMessage({title:"メッセージが送信されました",status:"success"});
    }
    } catch (error) {
      showMessage({title:"メッセージの送信に失敗しました", status:"error"});
    }finally{setLoading1(false)}
  };
  const getUserName = async (userId:string) => {
    const userDocRef = collection(db, "userinfo");
    const Query = query(userDocRef, where("userid", "==", userId));
    const userDocSnapshot = await getDocs(Query);
    if (!userDocSnapshot.empty) {
      const userData = userDocSnapshot.docs[0].data();
      console.log(userData)
      return userData.username || "Unknown";
    } else {
      return "Unknown";
    }
  };
  useEffect(() => {
        
    if(findFriendMessages && findFriendMessages.friendMessages){
    const unsub = onSnapshot(doc(db, "friendmessages", findFriendMessages.usersMessagesId), async(doc) => {
        if (doc) {
            const conversationData = doc.data();
            if (conversationData && conversationData.messages) {
                const messagesArray=conversationData.messages;
                const messageList=await Promise.all(messagesArray.map(async(message: AllMessage)=>{
                    const senderName=await getUserName(message.userId)
                    return {
                        userName:senderName,
                        value:message.value,
                        key:message.key
                    }
                }))
                setMessages1(messageList)
            }
    }}
    );  
        return ()=>{
            setLoading1(true)
            unsub();
            setLoading1(false)
        };
    }}
    ,[findFriendMessages])
    useEffect(() => {
        // ローカルストレージから情報を取得
        const storedInfo = localStorage.getItem("loggedInUser");
    
        if (!storedInfo) {
          history.push("/"); // ログインページへ遷移
        }
      }, [history]);
      const findUser=users.find((user)=>{
        return user.userid===userId
      })
      useEffect(() => {
        // 最新のメッセージまでスクロールする
        if (messagesListRef.current) {
          messagesListRef.current.scrollTop = messagesListRef.current.scrollHeight;
        }
      }, [messages1]);
    return (
      <>
        <Flex align="left" justify="left" >
        <Box w="sm">
            <Stack spacing={6} py={4} px={10}>
                <MainButton loading={loading} onClick={onClickUser}>{findUser?.username}</MainButton>
            </Stack>
        </Box>
        </Flex>
        <Box flex="1" overflowY="auto" ref={messagesListRef} position="relative"minHeight={`calc(100vh - 250px)`}>
        {loading ? (
          // ローディング中の表示
          <p>Loading...</p>
        ) : (
                <UnorderedList>
                    {messages1.map((message:MessageWithUserName)=>(
                        <ListItem key={message.key}>
                            <strong>{message.userName}:</strong>{message.value}
                        </ListItem>
                    ))}
                </UnorderedList>
                )}
        </Box>
        <Box
        position="fixed"
        bottom="0"
        left="0"
        right="0"
        borderTop="1px solid lightgray"
        p={4}
        bg="white"
        zIndex="999"
      >
                <Wrap w="100%">
                    <WrapItem flex="0.8">
                        <Textarea placeholder="メッセージ"id="メッセージ" borderColor="darkgray" size="sm" value={text} onChange={onChangeText} borderRadius={10}/>
                    </WrapItem>
                    <WrapItem > 
                            <MainButton loading={loading} onClick={onClickSend}>送信</MainButton>
                    </WrapItem>
                </Wrap>
                </Box>
                </>)}
    );