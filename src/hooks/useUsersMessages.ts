import { collection, query, where, getDocs, DocumentData, FieldPath, getDoc, doc, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useHistory } from "react-router-dom";
import { useMessage } from "./useMessage";
import { useCallback, useEffect, useState } from "react";
import { User } from "../types/api/user";
import { useLoginUser } from "./useLoginUser";
import { useOtherUsers } from "./useOtherUsers";
import { useRecruits } from "./useRecruits";
import { getAuth } from "firebase/auth";
import { Recruit } from "../types/api/recruit";
import { useRecruitData } from "./useRecruitData";
import { useMembers } from "./useMembers";
import { Member } from "../types/api/member";

import { Message } from "../types/api/message";
import { useMessages } from "./useMessages";
import { useParticipation } from "./useParticipation";
import { useParticipantMessages } from "./useParticipantMessages";
import { UsersMessage } from "../types/api/usersMessage";
import { useFriendMessages } from "./useFriendMessages";
import { Friend } from "../types/api/friend";
export type Data={
    industry: string[];
    occupation: string[];
    programming:string[];
    userid:string;
    username: string;
};
export const useUserMessages=()=>{
    const history=useHistory();
    const {showMessage}=useMessage();
    const auth=getAuth();
    const [friendData,setFriendData]=useState<string>('')
    const {friendMessages,setFriendMessages}=useFriendMessages()
    const userMessages=useCallback(async(userId:string)=>{
    
    const usersMessages:UsersMessage[]=[]
    //try{
        try{
        
            if(auth.currentUser){
            const q0=query(collection(db,"friends"),where("userid","==",auth.currentUser.uid),where("anotherid","==",userId))
            const q1=query(collection(db,"friends"),where("anotherid","==",auth.currentUser.uid),where("userid","==",userId))
            const querySnapshot0=await getDocs(q0)
            
            const querySnapshot1=await getDocs(q1)
            if(!querySnapshot0.empty||!querySnapshot1.empty){
                
                if(!querySnapshot0.empty){
                querySnapshot0.forEach((doc)=>{
                const docData=doc.data();
                const friendsid=doc.id
                console.log(friendsid)
                setFriendData(friendsid)
                })}
                if(!querySnapshot1.empty){
                    querySnapshot1.forEach((doc)=>{
                        const docData=doc.data();
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
                  
                  history.push(`/home/user_search/result/${userId}/messages`)
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
                  
                  history.push(`/home/user_search/result/${userId}/messages`)
            }else{console.log("as")}
        //    }}catch(error){
        //        try{
        //            if(auth.currentUser){
        //                const q1=query(collection(db,"friends"),where("userid","==",userId),where("anotherid","==",auth.currentUser.uid))
        //                const querySnapshot1=await getDocs(q1)
        //                if(!querySnapshot1.empty){
        //                    querySnapshot1.forEach((doc)=>{
        //                    const docData=doc.data();
        //                    const friendsid=doc.id
        //                    setFriendData(friendsid)
        //                    })}
        //                const q=query(collection(db,"friendmessages"),where("usersid", "==", friendData))
        //                const querySnapshot=await getDocs(q);
        //                if(!querySnapshot.empty){
        //                    querySnapshot.forEach((doc)=>{
        //                        const docData=doc.data();
        //                        const friendMessages=docData.messages
        //                        const usersId=docData.usersid
        //                        const usersMessagesId=doc.id
        //                        const data:UsersMessage={friendMessages,usersId,usersMessagesId}
        //                        usersMessages.push(data)
        //                    })}
        //                    if(usersMessages.length!==0){
        //                        setFriendMessages(usersMessages)
        //                    }                              
                              
        //                      history.push(`/home/user_search/result/${userId}/messages`)
        //        }}catch(error){
                
        }}
                  
                catch(error){
                    showMessage({title:"会話データの取得に失敗しました",status:"error"});
    
                }
      },[history,friendData,setFriendData,showMessage,setFriendMessages])

            return{userMessages,friendMessages,}
        }