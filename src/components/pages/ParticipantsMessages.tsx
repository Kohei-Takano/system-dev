import {ChangeEvent, memo,useEffect,useRef,useState,VFC}from"react";
import { MainButton } from "../atoms/button/MainButton";
import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Box, Flex, Input, ListItem, Stack, Textarea, UnorderedList, Wrap, WrapItem } from "@chakra-ui/react";
import { useApplications } from "../../hooks/useApplications";
import { auth, db } from "../../firebase";
import { arrayUnion, collection,doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, updateDoc, where,getFirestore } from "firebase/firestore";
import firebase from 'firebase/app';
import { useMessages } from "../../hooks/useMessages";
import { Message } from "../../types/api/message";
import { useMessage } from "../../hooks/useMessage";
import { useParticipantMessages } from "../../hooks/useParticipantMessages";

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

export const ParticipantsMessages: VFC = memo(()=>{
    
    const messagesListRef = useRef<HTMLDivElement | null>(null);
    const {messages, setMessages} = useMessages();
    const [messages1,setMessages1]=useState<MessageWithUserName[]>([]);
    const [text,setText] =useState('');
    const {showMessage}=useMessage()
    const {participantMessages}=useParticipantMessages()
    const{recruitId}=useParams<{ recruitId: string }>();
    const {applicationList,loading}=useApplications();
    const[loading1,setLoading1]=useState<boolean>(false)
    const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>)=>setText(e.target.value);
    const history=useHistory();
    const onClickTitle=()=>history.push("/home/co_developer/recruitmentid")
    //const onClickList=()=>applicationList(recruitId)//history.push(`/home/co_developer/${recruitId}/application_list`)
    const onClickSend=()=>{
        if (text) {
        addMessageToFirestore(text);
    }}
    useEffect(() => {
      // メッセージリストの高さを調整して、入力欄の下にメッセージが隠れないようにする
      if (messagesListRef.current) {
        messagesListRef.current.style.maxHeight = `${window.innerHeight -180 /* フッターやヘッダーの高さなどを考慮 */}px`;
      }
    }, []);
    const findMessages=participantMessages.find((message:Message)=>{
        return message.recruitid===recruitId
    })
    const addMessageToFirestore = async (text:string) => {
        try {
            setLoading1(true)
          // "messages" コレクションに新しいドキュメントを追加
          if(findMessages){
          const conversationRef = doc(db, "messages", findMessages.messagesid);
          await updateDoc(conversationRef, {
            messages: arrayUnion({key:findMessages.messages.length,value:text,userId:auth.currentUser?.uid})
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
        
        if(findMessages && findMessages.messages){
        const unsub = onSnapshot(doc(db, "messages", findMessages.messagesid), async(doc) => {
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
                //    const messagesWithUsernames=[]
                //    if(conversationData.usersid[1]){
                //    for(let i=0;i < conversationData.usersid.length;i++){
                //        const userId = conversationData.usersid[i+1];
                //        const messageText:string = conversationData.messages[i];
                //        const userName:string=await getUserName(userId);
                    //    const userDocRef =collection(db, "userinfo") 
                    //    await getDoc(doc(db, "userinfo", userid));
            //const userName = userDoc.data()?.userName || "Unknown";
                //        const messageWithUsername:MessageWithUserName = {
                //        userName: userName,
                //        text: messageText,
                //        };
                //        messagesWithUsernames.push(messageWithUsername)
                //    }}
                //    setMessages1(messagesWithUsernames)
                    //conversationData.messages.map(async (message: Message) => {
                      //  const userDoc = await getDoc(doc(db, "users", message.userid));
                  //setMessages1(conversationData.messages);
                }
        }}
        );  
            return ()=>{
                setLoading1(true)
                unsub();
                setLoading1(false)
            };
        }}
        ,[findMessages])
        
    useEffect(() => {
        // ローカルストレージから情報を取得
        const storedInfo = localStorage.getItem("loggedInUser");
    
        if (!storedInfo) {
          history.push("/"); // ログインページへ遷移
        }
      }, [history]);
      useEffect(() => {
        // 最新のメッセージまでスクロールする
        if (messagesListRef.current) {
          messagesListRef.current.scrollTop = messagesListRef.current.scrollHeight;
        }
      }, [messages1]);
    return (
        <>
        <Box flex="1" overflowY="auto" ref={messagesListRef} // フッターのための十分なスペースを残すようにこの値を調整
        // フッターが固定入力の下に表示されるように、次のCSSスタイルを追加
        position="relative"
        minHeight={`calc(100vh - 180px)`}>
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
        </>
    )
});