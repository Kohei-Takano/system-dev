import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { User as FirebaseAuthUser } from "firebase/auth";
import { User } from "../types/api/user";

export type LoginUserContextType={
    loginUser: FirebaseAuthUser|null;
    setLoginUser:Dispatch<SetStateAction<FirebaseAuthUser|null>>
    logoutUser:()=>void;
}
export const LoginUserContext=createContext<LoginUserContextType>({}as LoginUserContextType)

export const LoginUserProvider=(props:{children:ReactNode})=>{
    const {children}=props;
    const [loginUser,setLoginUser]=useState<FirebaseAuthUser|null>(null);
    const logoutUser=()=>{
        localStorage.removeItem("loggedInUser");
       
        setLoginUser(null);
    }
    return(

        <LoginUserContext.Provider value={{loginUser,setLoginUser,logoutUser}}>
            {children}
        </LoginUserContext.Provider>
    )
}