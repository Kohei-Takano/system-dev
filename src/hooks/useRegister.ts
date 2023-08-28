import axios from "axios";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { useMessage } from "./useMessage";
import { useLoginUser } from "./useLoginUser";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const useRegister=()=>{
    const history=useHistory();
    const {showMessage}=useMessage();
    const {setLoginUser}=useLoginUser();

    const [loading,setLoading]=useState(false);

    const auth = getAuth();
    const register=useCallback((email:string,password:string,password2:string)=>{
        setLoading(true);
        if(password===password2 && password.length>=8){
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            if(userCredential.user){
            // Signed in 
            localStorage.setItem("loggedInUser", JSON.stringify(userCredential.user))
            setLoginUser(userCredential.user);
            showMessage({title:"登録しました",status:"success"})
            history.push("/home/user_info");
            // ...
            }else{
                showMessage({title:"エラー",status:"error"})
                setLoading(false);
            }
          })
          .catch((error) => {
            history.push("/");
            const errorCode = error.code;
            showMessage({title:`${errorCode}:${error.message}`,status:"error"
          });setLoading(false);
        });
    }else{
        showMessage({title:"最初に入力したパスワードと再入力したパスワードが異なっているか、パスワードが8文字未満になっています",status:"error"})
        setLoading(false);
    }
    },[history,showMessage,setLoginUser,auth]);
    return{register,loading};
}