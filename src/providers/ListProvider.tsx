import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { Recruit } from "../types/api/recruit";
import { List } from "../types/api/list";

export type ListContextType={
    list: List[];
    setList:Dispatch<SetStateAction<List[]>>
}

export const ListContext=createContext<ListContextType>({}as ListContextType)

export const ListProvider=(props:{children:ReactNode})=>{
    const {children}=props;
    const [list,setList]=useState<List[]>([]);

    return(

        <ListContext.Provider value={{list,setList}}>
            {children}
        </ListContext.Provider>
    )
}