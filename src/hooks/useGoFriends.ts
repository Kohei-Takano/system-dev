import { collection, query, where, getDocs, DocumentData, FieldPath, getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useHistory } from "react-router-dom";
import { useMessage } from "./useMessage";
import { useCallback, useState } from "react";
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
export type Data={
    industry: string[];
    occupation: string[];
    programming:string[];
    userid:string;
    username: string;
};
export const useGoFriends=()=>{
    const history=useHistory();
    const {showMessage}=useMessage();
    const {recruits,setRecruits}=useRecruits();
    const auth=getAuth();
    const {users,setUsers}=useOtherUsers();
    const {applications,setApplications}=useRecruitData()
    const {members,setMembers}=useMembers()
    const {messages,setMessages}=useMessages()
    const {participation,setParticipation}=useParticipation()
    const {participantMessages,setParticipantMessages}=useParticipantMessages()
    const recruitData:string[]=[]
    const [friends1,setFriends1]=useState<string[]>([])
    const [friends2,setFriends2]=useState<string[]>([])
    const goFriends=useCallback(async()=>{
        const friends:string[]=[] 
        const row:User[]=[];
    try{
        
        if(auth.currentUser){
        const q0=query(collection(db,"friends"),where("userid","==",auth.currentUser.uid))
            const q1=query(collection(db,"friends"),where("anotherid","==",auth.currentUser.uid))
            const querySnapshot0=await getDocs(q0)
            
            const querySnapshot1=await getDocs(q1)
            
                
                if(!querySnapshot0.empty){
                querySnapshot0.forEach((doc)=>{
                const docData=doc.data();
                const friendsid1=docData.anotherid
                friends.push(friendsid1)
                })
            }
                if(!querySnapshot1.empty){
                    querySnapshot1.forEach((doc)=>{
                        const docData=doc.data();
                        const friendsid2=docData.userid
                        friends.push(friendsid2)
                        })}
                
                    for(const item of friends){
                        const friendsQuery = query(collection(db, "userinfo"), where("userid", "==", item));
                        const friendsQuerySnapshot = await getDocs(friendsQuery);
                        console.log(friendsQuerySnapshot)
                        if(!friendsQuerySnapshot.empty){
                            friendsQuerySnapshot.forEach((doc) => {
                            const docData= doc.data();
                            const industry=docData.industry
                            const occupation=docData.occupation
                            const programming=docData.programming
                            const userid=docData.userid
                            const username=docData.username
                            const participationNumber=docData.participationNumber
                            const url1=docData.url1
                            const url2=docData.url2
                            const data:User={industry,occupation,programming,userid,username,participationNumber,url1,url2}
                            console.log(data)
                            if(!row.some((u)=>u.userid===userid)){
                            row.push(data);
                        }
                            });
                        }}
        }
                setUsers(row)
                
                
                
                
                history.push("/home/friend_list")
                    
                    
            }catch(error){
                showMessage({title:"ユーザデータの取得に失敗しました",status:"error"});
                //history.push("/home/co_developer")
            }},[history,showMessage,setUsers])
            return{goFriends,users}
        }