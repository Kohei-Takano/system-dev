import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { useMessage } from "./useMessage";
import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useMembers } from "./useMembers";
import { useRecruitTeam } from "./useRecruitTeam";
import { useMessages } from "./useMessages";

export const useRecruitDetail=()=>{
    const history=useHistory();
    const {showMessage}=useMessage();

    const [loading,setLoading]=useState(false);
    const {members}=useMembers()
    const {messages}=useMessages()
    const auth = getAuth();
    const recruitDetail=useCallback(async(recruitId:string)=>{
        //setLoading(true);
        //const findMembers=members.find((member)=>{
        //    return member.recruitid===recruitId
        //  })
        //const findMessages=messages.find((message)=>{
        //    return message.recruitid===recruitId
        //})
        
        //if(!findMembers){
        //    await addDoc(collection(db,"members"),{
        //        teamMembers: [auth.currentUser?.uid],
        //        recruitid: recruitId
        //    });
        //    }
        //    if(!findMessages){
        //        await addDoc(collection(db,"messages"),{
        //            messages: [],
        //            recruitid: recruitId,
        //            usersid:[auth.currentUser?.uid]
        //        })
        //    }
        //    setLoading(false);
            history.push(`/home/co_developer/${recruitId}`)
        },[history
            //showMessage,auth,addDoc
        ]);
        return{recruitDetail,loading};    
}