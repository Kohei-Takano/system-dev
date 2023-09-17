import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { User } from "../types/api/user";
import { Recruit } from "../types/api/recruit";

export type ParticipationContextType={
    participation: Recruit[];
    setParticipation:Dispatch<SetStateAction<Recruit[]>>
}

export const ParticipationContext=createContext<ParticipationContextType>({}as ParticipationContextType)

export const ParticipationProvider=(props:{children:ReactNode})=>{
    const {children}=props;
    const [participation,setParticipation]=useState<Recruit[]>([]);

    return(

        <ParticipationContext.Provider value={{participation,setParticipation}}>
            {children}
        </ParticipationContext.Provider>
    )
}