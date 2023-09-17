import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { User } from "../types/api/user";
import { Member } from "../types/api/member";
import { Message } from "../types/api/message";

export type OtherTeamMembersContextType={
    otherTeamMembers: Member[];
    setOtherTeamMembers:Dispatch<SetStateAction<Member[]>>
}

export const OtherTeamMembersContext=createContext<OtherTeamMembersContextType>({}as OtherTeamMembersContextType)

export const OtherTeamMembersProvider=(props:{children:ReactNode})=>{
    const {children}=props;
    const [otherTeamMembers,setOtherTeamMembers]=useState<Member[]>([]);

    return(

        <OtherTeamMembersContext.Provider value={{otherTeamMembers,setOtherTeamMembers}}>
            {children}
        </OtherTeamMembersContext.Provider>
    )
}