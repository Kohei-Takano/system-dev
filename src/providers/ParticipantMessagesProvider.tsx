import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { User } from "../types/api/user";
import { Member } from "../types/api/member";
import { Message } from "../types/api/message";

export type ParticipantMessagesContextType={
    participantMessages: Message[];
    setParticipantMessages:Dispatch<SetStateAction<Message[]>>
}

export const ParticipantMessagesContext=createContext<ParticipantMessagesContextType>({}as ParticipantMessagesContextType)

export const ParticipantMessagesProvider=(props:{children:ReactNode})=>{
    const {children}=props;
    const [participantMessages,setParticipantMessages]=useState<Message[]>([]);

    return(

        <ParticipantMessagesContext.Provider value={{participantMessages,setParticipantMessages}}>
            {children}
        </ParticipantMessagesContext.Provider>
    )
}