import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { Recruit } from "../types/api/recruit";
import { List } from "../types/api/list";

export type FriendsContextType={
    friends: string[];
    setFriends:Dispatch<SetStateAction<string[]>>
}

export const FriendsContext=createContext<FriendsContextType>({}as FriendsContextType)

export const FriendsProvider=(props:{children:ReactNode})=>{
    const {children}=props;
    const [friends,setFriends]=useState<string[]>([]);

    return(

        <FriendsContext.Provider value={{friends,setFriends}}>
            {children}
        </FriendsContext.Provider>
    )
}