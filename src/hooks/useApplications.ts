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
import { useRecruitData } from "./useRecruitData";
import { useList } from "./useList";
import { List } from "../types/api/list";
export type Application={
    recruitid: string;
    text: string;
    userid:string;
};
export const useApplications=()=>{
    const history=useHistory();
    const {showMessage}=useMessage();
    
    const {recruits,setRecruits}=useRecruits();
    const {applications,setApplications}=useRecruitData()
    const {list,setList}=useList()
    const [loading,setLoading]=useState(false);
    const applicationList=useCallback(async(recruitId:string)=>{
        setLoading(true);
    try{
        const q = query(collection(db, "application"), where("recruitid", "==", recruitId));

    const querySnapshot = await getDocs(q);
    if(!querySnapshot.empty){
        
        const row:List[]=[]
    
        querySnapshot.forEach((doc) => {
            const docData=doc.data()
            const applicationid:string=doc.id
            const recruitid:string=docData.recruitid
            const text:string=docData.text
            const userid:string=docData.userid
            const data={applicationid,recruitid,text,userid}
            row.push(data);
        // doc.data() is never undefined for query doc snapshots
        });
            setList(row);
            history.push(`/home/co_developer/${recruitId}/application_list`)
    }else{
        showMessage({title:"現在応募はありません",status:"error"});
    
    }
    }catch(error){
        showMessage({title:"応募情報の取得に失敗しました",status:"error"});
    }finally{
        setLoading(false);
    }},[history,showMessage,setList])
    return{applicationList,loading,list}
}