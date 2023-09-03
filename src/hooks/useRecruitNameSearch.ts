import { collection, query, where, getDocs, DocumentData } from "firebase/firestore";
import { db } from "../firebase";
import { useHistory } from "react-router-dom";
import { useMessage } from "./useMessage";
import { useCallback, useState } from "react";
import { User } from "../types/api/user";
import { useLoginUser } from "./useLoginUser";
import { useOtherUsers } from "./useOtherUsers";
import { useRecruits } from "./useRecruits";
import { Recruit } from "../types/api/recruit";
export type Data={
    industry: string[];
    occupation: string[];
    programming:string[];
    userid:string;
    username: string;
};
export const useRecruitNameSearch=()=>{
    const history=useHistory();
    const {showMessage}=useMessage();
    
    const {recruits,setRecruits}=useRecruits();

    const [loading,setLoading]=useState(false);
    const recruitNameSearch=useCallback(async(recruitName:string)=>{
        setLoading(true);
    try{
        const q = query(collection(db, "recruit"), where("recruitTitle", "==", recruitName));

    const querySnapshot = await getDocs(q);
    if(!querySnapshot.empty){
        
        const row:Recruit[]=[]
    
        querySnapshot.forEach((doc) => {
            const docData=doc.data()
            const recruitid=doc.id
            const people=docData.people
            const recruitTitle=docData.recruitTitle
            const text=docData.text
            const thing=docData.thing
            const time=docData.time
            const userid=docData.userid
            const data:Recruit={recruitid,people,recruitTitle,text,thing,time,userid}
            row.push(data);
        // doc.data() is never undefined for query doc snapshots
        });
            setRecruits(row);
            history.push("/home/co_developer/search/result")
    }else{
        showMessage({title:"募集が見つかりませんでした",status:"error"});
    
    }
    }catch(error){
        showMessage({title:"募集情報の取得に失敗しました",status:"error"});
    }finally{
        setLoading(false);
    }},[history,showMessage,setRecruits])
    return{recruitNameSearch,loading,recruits}
}