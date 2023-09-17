import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { useMessage } from "./useMessage";
import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

export const useNewRecruit=()=>{
    const history=useHistory();
    const {showMessage}=useMessage();

    const [loading,setLoading]=useState(false);

    const auth = getAuth();
    const newRecruit=useCallback(async(recruitTitle:string,text:string,thing:string[],time:string[],people:string[])=>{
        setLoading(true);
        if(recruitTitle||text||thing||time||people){
            const recruitDocRef=await addDoc(collection(db,"recruit"),{
                recruitTitle:recruitTitle,
                text:text,
                thing:thing,
                time:time,
                people:people,
                userid:auth.currentUser?.uid
            });
            const recruitId=recruitDocRef.id;
            await addDoc(collection(db, "members"), {
                teamMembers: [auth.currentUser?.uid],
                recruitid: recruitId
              });
              await addDoc(collection(db,"messages"),{
                messages: [{key:0,value:"会話を開始しました",userId:auth.currentUser?.uid}],
                recruitid: recruitId,
                usersid:[auth.currentUser?.uid]
            })
            setLoading(false);
            history.push("/home")
            showMessage({title:"新規募集を開始しました",status:"success"})
            }else{
                showMessage({title:"募集は行われませんでした",status:"error"})
                setLoading(false);
                history.push("/home")
            }
        },[history,showMessage,auth,addDoc]);
        return{newRecruit,loading};    
}