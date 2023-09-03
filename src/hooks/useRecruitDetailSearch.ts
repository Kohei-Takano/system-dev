import { collection, query, where, getDocs, DocumentData } from "firebase/firestore";
import { db } from "../firebase";
import { useHistory } from "react-router-dom";
import { useMessage } from "./useMessage";
import { useCallback, useState } from "react";
import { User } from "../types/api/user";
import { useLoginUser } from "./useLoginUser";
import { useOtherUsers } from "./useOtherUsers";
import { useRecruits } from "./useRecruits";
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
    
    const {users,setUsers}=useOtherUsers();

    const recruitDetailSearch=useCallback(async(recruitId:string)=>{
        const findRecruit=recruits.find((recruit)=>{
            return recruit.recruitid===recruitId
          })
        const oneUser:User[]=[]
    try{
        const q = query(collection(db, "userinfo"), where("userid", "==", findRecruit?.userid));
            const QuerySnapshot = await getDocs(q);
            if(!QuerySnapshot.empty){
            QuerySnapshot.forEach((doc) => {
              const docData= doc.data();
              const industry=docData.industry
                const occupation=docData.occupation
                const programming=docData.programming
                const userid=docData.userid
                const username=docData.username
                const data:User={industry,occupation,programming,userid,username}
                oneUser.push(data)
                setUsers(oneUser);}
                )
                    history.push(`/home/co_developer/search/result/${recruitId}`)}else{
                      showMessage({title:"ユーザが見つかりません",status:"error"})
                    }
            }catch(error){
        
                showMessage({title:"ユーザ取得に失敗しました",status:"error"});
            }},[history,showMessage,setUsers])
            return{recruitDetailSearch,users}
        }