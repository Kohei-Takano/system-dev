import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { User } from "../types/api/user";
import { Member } from "../types/api/member";
import { Message } from "../types/api/message";

export type MessagesContextType={
    messages: Message[];
    setMessages:Dispatch<SetStateAction<Message[]>>
}

export const MessagesContext=createContext<MessagesContextType>({}as MessagesContextType)

export const MessagesProvider=(props:{children:ReactNode})=>{
    const {children}=props;
    const [messages,setMessages]=useState<Message[]>([]);

    return(

        <MessagesContext.Provider value={{messages,setMessages}}>
            {children}
        </MessagesContext.Provider>
    )
}