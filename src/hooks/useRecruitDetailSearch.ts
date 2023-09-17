import { collection, query, where, getDocs, DocumentData, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useHistory } from "react-router-dom";
import { useMessage } from "./useMessage";
import { useCallback, useState } from "react";
import { User } from "../types/api/user";
import { useLoginUser } from "./useLoginUser";
import { useOtherUsers } from "./useOtherUsers";
import { useRecruits } from "./useRecruits";
import { Member } from "../types/api/member";
import { useMembers } from "./useMembers";
import { useOtherTeamMembers } from "./useOtherTeamMembers";
export type Data={
    industry: string[];
    occupation: string[];
    programming:string[];
    userid:string;
    username: string;
};
export const useRecruitDetailSearch=()=>{
    const history=useHistory();
    const {showMessage}=useMessage();
    const {recruits}=useRecruits();
    const {members}=useMembers()
    const {otherTeamMembers,setOtherTeamMembers}=useOtherTeamMembers()
    
    const {users,setUsers}=useOtherUsers();

    const recruitDetailSearch=useCallback(async(recruitId:string)=>{
        const findRecruit=recruits.find((recruit)=>{
            return recruit.recruitid===recruitId
          })
        const oneMember:Member[]=[]
        const oneUser:User[]=[]
        
        const findMembers=members.find((member)=>{
          return member.recruitid===recruitId
        })
            
    try{
        const q = query(collection(db, "members"), where("recruitid", "==", recruitId));
            const QuerySnapshot = await getDocs(q);
    //        const documentRef = doc(collection(db,"members"), findMembers?.teamid);
    //        const documentSnapshot = await getDoc(documentRef);
      //      const membersCollection = collection(db, "members");
      //      const memberQuery = query(membersCollection, where("recruitid", "==", recruitId));
      //      const querySnapshot = await getDocs(memberQuery);
      //      console.log(!querySnapshot.empty)
            if(!QuerySnapshot.empty){
            QuerySnapshot.forEach((doc) => {
             // const docData= QuerySnapshot.docs[0].data();
              const docData = doc.data();
                const recruitid=docData.recruitid
                const teamMembers=docData.teamMembers
                const teamid=doc.id
                const data:Member={teamMembers,recruitid,teamid}
                oneMember.push(data)
                
                })
                //setOtherTeamMembers(oneMember)
                  
                console.log(oneMember)
                const findMembers=oneMember.find((member)=>{
                  return member.recruitid===recruitId
                })
                console.log(findMembers);
                if(findMembers){
                  for(const item of findMembers.teamMembers){
                  const q1=query(collection(db,"userinfo"),where("userid","==",item));
                  const QuerySnapshot1=await getDocs(q1);
                  if(!QuerySnapshot1.empty){
                    QuerySnapshot1.forEach((doc) => {
                      const docData= doc.data();
                      const industry=docData.industry
                        const occupation=docData.occupation
                        const programming=docData.programming
                        const userid=docData.userid
                        const username=docData.username
                        const data:User={industry,occupation,programming,userid,username}
                        oneUser.push(data)
                        })
                  }
                  }setUsers(oneUser);
                }
                    //history.push(`/home/co_developer/search/result/${recruitId}`)
                  }else{
                      showMessage({title:"ユーザが見つかりません",status:"error"})
                    }
            }catch(error){
        
                showMessage({title:"ユーザ取得に失敗しました",status:"error"});
            }},[history,showMessage,setOtherTeamMembers,setUsers])
            return{recruitDetailSearch,users}
        }