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
export type Data={
    industry: string[];
    occupation: string[];
    programming:string[];
    userid:string;
    username: string;
};
export const useRecruitTeam=()=>{
    const history=useHistory();
    const {showMessage}=useMessage();
    const {recruits,setRecruits}=useRecruits();
    const auth=getAuth();
    const {users,setUsers}=useOtherUsers();
    const {applications,setApplications}=useRecruitData()
    const {members,setMembers}=useMembers()
    const {messages,setMessages}=useMessages()
    const recruitData:string[]=[]
    const recruitTeam=useCallback(async()=>{
        const myRecruits:Recruit[]=[] 
        const myTeam:Member[]=[]
        const myMessages:Message[]=[]
        
    try{
        const q1 = query(collection(db, "recruit"), where("userid", "==", auth.currentUser?.uid));
            const q1QuerySnapshot = await getDocs(q1);
            if(!q1QuerySnapshot.empty){
            q1QuerySnapshot.forEach((doc) => {
              const docData= doc.data();
              const recruitid=doc.id
              const people=docData.people
                const recruitTitle=docData.recruitTitle
                const text=docData.text
                const thing=docData.thing
                const time=docData.time
                const userid=docData.userid
                const data:Recruit={recruitid,people,recruitTitle,text,thing,time,userid}
                myRecruits.push(data)
                }
                )}
                //const q2=query(collection(db,"recruit"),where(""))
                //const q2QuerySnapshot=await getDocs(q2);
                //if(!q2QuerySnapshot){
                  //  q1QuerySnapshot.forEach((doc) => {
                    //    const docData= doc.data();
                      //  const recruitid=doc.id
                        //const people=docData.people
                          //const recruitTitle=docData.recruitTitle
                          //const text=docData.text
                          //const thing=docData.thing
                          //const time=docData.time
                          //const userid=docData.userid
                          //const data:Recruit={recruitid,people,recruitTitle,text,thing,time,userid}
                          //myRecruits.push(data)
                          //}
                          //)
                //}
                
                const q3=query(collection(db,"application"),where("userid","==",auth.currentUser?.uid));
                const q3QuerySnapshot = await getDocs(q3);
            if(!q3QuerySnapshot.empty){
            q3QuerySnapshot.forEach((doc) => {
              const docData= doc.data();
              const recruitid=docData.recruitid
                recruitData.push(recruitid)
                }
                )}
                const recruitsCollection = collection(db, 'recruit');
                for (const application of recruitData) {
                    const docRef = doc(recruitsCollection, application);
                    const docSnapshot = await getDoc(docRef);
                    
                    if (docSnapshot.exists()) {
                      const data = docSnapshot.data();
                      const recruitid=application
                        const people=data.people
                        const recruitTitle=data.recruitTitle
                        const text=data.text
                        const thing=data.thing
                        const time=data.time
                        const userid=data.userid
                        const recruitData:Recruit={recruitid,people,recruitTitle,text,thing,time,userid}
                      myRecruits.push(recruitData);
                    }
                  }
                
                //const q4=query(recruitsCollection,where(,"in",applications));
                
                //const q4QuerySnapshot = await getDocs(q4);
                
            //if(!q4QuerySnapshot.empty){
            //q4QuerySnapshot.forEach((doc) => {
              //  const docData= doc.data();
//              const recruitid=doc.id
  //            const people=docData.people
    //            const recruitTitle=docData.recruitTitle
      //          const text=docData.text
        //        const thing=docData.thing
          //      const time=docData.time
            //    const userid=docData.userid
              //  const data:Recruit={recruitid,people,recruitTitle,text,thing,time,userid}
                //myRecruits.push(data)
                //}
                //)}
                
                const q5 = query(collection(db, "members"), where("teamMembers", "array-contains", auth.currentUser?.uid));
            const q5QuerySnapshot = await getDocs(q5);
            if(!q5QuerySnapshot.empty){
            q5QuerySnapshot.forEach((doc) => {
              const docData= doc.data();
              const teamid=doc.id
              const recruitid=docData.recruitid
                const teamMembers=docData.teamMembers
                const data:Member={teamMembers,recruitid,teamid}
                myTeam.push(data)
                }
                )}
                const q6 =query(collection(db,"messages"),where("usersid","array-contains",auth.currentUser?.uid));
                const q6QuerySnapshot=await getDocs(q6);
                if(!q6QuerySnapshot.empty){
                  q6QuerySnapshot.forEach((doc) => {
                    const docData= doc.data();
                    const messagesid=doc.id
                    const recruitid=docData.recruitid
                      const messages=docData.messages
                      const usersid=docData.usersid
                      const data:Message={messages,recruitid,usersid,messagesid}
                      myMessages.push(data)
                      }
                      )}

                if(myRecruits.length!==0){
                    setRecruits(myRecruits);
                    setApplications(recruitData)
                
                   
                }
                if(myTeam.length!==0){
                    setMembers(myTeam)
                }
                
                if(myMessages.length!==0){
                  setMessages(myMessages)
                }

                history.push("/home/co_developer/")
                      
                    
            }catch(error){
        
                showMessage({title:"関与中の募集データの取得に失敗しました",status:"error"});
            }},[history,showMessage,setRecruits,setApplications,setMembers,setMessages])
            return{recruitTeam,recruits,applications,members,messages}
        }