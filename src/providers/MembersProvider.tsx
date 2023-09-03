import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { User } from "../types/api/user";
import { Member } from "../types/api/member";

export type MembersContextType={
    members: Member[];
    setMembers:Dispatch<SetStateAction<Member[]>>
}

export const MembersContext=createContext<MembersContextType>({}as MembersContextType)

export const MembersProvider=(props:{children:ReactNode})=>{
    const {children}=props;
    const [members,setMembers]=useState<Member[]>([]);

    return(

        <MembersContext.Provider value={{members,setMembers}}>
            {children}
        </MembersContext.Provider>
    )
}