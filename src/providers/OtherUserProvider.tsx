import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { User } from "../types/api/user";

export type UsersContextType={
    users: User[];
    setUsers:Dispatch<SetStateAction<User[]>>
}

export const UsersContext=createContext<UsersContextType>({}as UsersContextType)

export const UsersProvider=(props:{children:ReactNode})=>{
    const {children}=props;
    const [users,setUsers]=useState<User[]>([]);

    return(

        <UsersContext.Provider value={{users,setUsers}}>
            {children}
        </UsersContext.Provider>
    )
}