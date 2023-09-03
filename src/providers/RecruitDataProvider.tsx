import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";


export type RecruitDataContextType={
    applications: string[];
    setApplications:Dispatch<SetStateAction<string[]>>
}

export const RecruitDataContext=createContext<RecruitDataContextType>({}as RecruitDataContextType)

export const RecruitDataProvider=(props:{children:ReactNode})=>{
    const {children}=props;
    const [applications,setApplications]=useState<string[]>([]);

    return(

        <RecruitDataContext.Provider value={{applications,setApplications}}>
            {children}
        </RecruitDataContext.Provider>
    )
}