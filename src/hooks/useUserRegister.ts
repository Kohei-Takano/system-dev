import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { useMessage } from "./useMessage";
import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

export const useUserRegister=()=>{
    const history=useHistory();
    const {showMessage}=useMessage();

    const [loading,setLoading]=useState(false);

    const auth = getAuth();
    const userRegister=useCallback(async(username:string|null,industry:string[],occupation:string[],programming:string[])=>{
        setLoading(true);
        if(username||industry||occupation||programming){
            await addDoc(collection(db,"userinfo"),{
                username:username,
                industry:industry,
                occupation:occupation,
                programming:programming,
                userid:auth.currentUser?.uid
            });
            setLoading(false);
            history.push("/home")
            }else{
                showMessage({title:"変更は行われませんでした",status:"success"})
                setLoading(false);
                history.push("/home")
            }
        },[history,showMessage,auth,addDoc]);
        return{userRegister,loading};    
}