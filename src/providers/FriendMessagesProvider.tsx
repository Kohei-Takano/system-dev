import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { UsersMessage } from "../types/api/usersMessage";

export type FriendMessagesContextType={
    friendMessages: UsersMessage[];
    setFriendMessages:Dispatch<SetStateAction<UsersMessage[]>>
}

export const FriendMessagesContext=createContext<FriendMessagesContextType>({}as FriendMessagesContextType)

export const FriendMessagesProvider=(props:{children:ReactNode})=>{
    const {children}=props;
    const [friendMessages,setFriendMessages]=useState<UsersMessage[]>([]);

    return(

        <FriendMessagesContext.Provider value={{friendMessages,setFriendMessages}}>
            {children}
        </FriendMessagesContext.Provider>
    )
}