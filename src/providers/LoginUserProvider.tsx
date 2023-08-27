import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";

import { User } from "../types/api/user";

export type LoginUserContextType={
    loginUser:User|null;
    setLoginUser:Dispatch<SetStateAction<User|null>>
    logoutUser:()=>void;
}
export const LoginUserContext=createContext<LoginUserContextType>({}as LoginUserContextType)

export const LoginUserProvider=(props:{children:ReactNode})=>{
    const {children}=props;
    const [loginUser,setLoginUser]=useState<User|null>(null);
    const logoutUser=()=>setLoginUser(null);
    return(

        <LoginUserContext.Provider value={{loginUser,setLoginUser,logoutUser}}>
            {children}
        </LoginUserContext.Provider>
    )
}