import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { Recruit } from "../types/api/recruit";

export type RecruitsContextType={
    recruits: Recruit[];
    setRecruits:Dispatch<SetStateAction<Recruit[]>>
}

export const RecruitsContext=createContext<RecruitsContextType>({}as RecruitsContextType)

export const RecruitsProvider=(props:{children:ReactNode})=>{
    const {children}=props;
    const [recruits,setRecruits]=useState<Recruit[]>([]);

    return(

        <RecruitsContext.Provider value={{recruits,setRecruits}}>
            {children}
        </RecruitsContext.Provider>
    )
}