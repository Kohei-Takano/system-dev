import { doc, deleteDoc } from "firebase/firestore";
import { useMessage } from "./useMessage";
import { useCallback, useState } from "react";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";

export const useDeleteApplication=()=>{
    const {showMessage}=useMessage();

    const [loading,setLoading]=useState(false);

    const auth = getAuth();
    const deleteApplication=useCallback(async(applicationid:string|undefined)=>{
        try{
            if(applicationid){
        setLoading(true);
            await deleteDoc(doc(db, 'application', applicationid));
            setLoading(false);
            showMessage({title:"応募申請を拒否しました",status:"success"})
        }
        }catch(error){
                showMessage({title:"応募申請を拒否できませんでした",status:"error"})
            }finally{setLoading(false)}
        },[showMessage,auth,deleteDoc]);
        return{deleteApplication,loading};    
}