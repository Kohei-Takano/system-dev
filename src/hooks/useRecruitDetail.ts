import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { useMessage } from "./useMessage";
import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useMembers } from "./useMembers";
import { useRecruitTeam } from "./useRecruitTeam";

export const useRecruitDetail=()=>{
    const history=useHistory();
    const {showMessage}=useMessage();

    const [loading,setLoading]=useState(false);
    const {members}=useMembers()
    const auth = getAuth();
    const recruitDetail=useCallback(async(recruitId:string)=>{
        setLoading(true);
        const findMembers=members.find((member)=>{
            return member.recruitid===recruitId
          })
        
        if(!findMembers){
            await addDoc(collection(db,"members"),{
                teamMembers: [auth.currentUser?.uid],
                recruitid: recruitId
            });
            setLoading(false);
            history.push(`/home/co_developer/${recruitId}`)
            }else{
                setLoading(false);
                history.push(`/home/co_developer/${recruitId}`)
            }
        },[history,showMessage,auth,addDoc]);
        return{recruitDetail,loading};    
}