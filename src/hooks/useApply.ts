import { collection, query, where, getDocs, DocumentData, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useHistory } from "react-router-dom";
import { useMessage } from "./useMessage";
import { useCallback, useState } from "react";
import { User } from "../types/api/user";
import { useLoginUser } from "./useLoginUser";
import { useOtherUsers } from "./useOtherUsers";
import { getAuth } from "firebase/auth";
export type Data={
    industry: string[];
    occupation: string[];
    programming:string[];
    userid:string;
    username: string;
};
export const useApply=()=>{
    const history=useHistory();
    const {showMessage}=useMessage();
    
    const {users,setUsers}=useOtherUsers();

    const [loading,setLoading]=useState(false);
    const auth = getAuth();
    const apply=useCallback(async(text:string,recruitid:string)=>{
        setLoading(true);
        if(text){
            await addDoc(collection(db,"application"),{
                text:text,
                recruitid:recruitid,
                userid:auth.currentUser?.uid
            });
            setLoading(false);
            history.push("/home")
            showMessage({title:"応募メッセージを送信しました",status:"success"})
            }else{
                showMessage({title:"応募は行われませんでした",status:"error"})
                setLoading(false);
                history.push("/home")
            }
        },[history,showMessage,auth,addDoc]);
        return{apply,loading};    
}