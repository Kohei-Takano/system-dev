import axios from "axios";
import { useCallback, useState } from "react"
import { User } from "../types/api/user";
import { useHistory } from "react-router-dom";
import { useMessage } from "./useMessage";
import { useLoginUser } from "./useLoginUser";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const useAuth=()=>{
    const history=useHistory();
    const {showMessage}=useMessage();
    const {setLoginUser}=useLoginUser();

    const [loading,setLoading]=useState(false);
    const auth = getAuth();
    const login=useCallback((email:string,password:string)=>{
        setLoading(true);
        
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            if(userCredential.user){
                localStorage.setItem("loggedInUser", JSON.stringify(userCredential.user))
                setLoginUser(userCredential.user);
                showMessage({title:"ログインしました",status:"success"})
                history.push("/home");
                window.location.reload();
            }else{
                showMessage({title:"ユーザが見つかりません",status:"error"})
                setLoading(false);
                }
        })
        .catch((error) => {
            showMessage({title:"ログインできません",status:"error"});
            setLoading(false);
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    },[history,showMessage,setLoginUser]);
    return{login,loading};
}