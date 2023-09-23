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
export const useRecruitSearch=()=>{
    const history=useHistory();
    const {showMessage}=useMessage();
    
    const {recruits,setRecruits}=useRecruits();

    const [loading1,setLoading1]=useState(false);
    const recruitSearch=useCallback(async(thing:string[],time:string[],people:string[])=>{
        setLoading1(true);
    try{
        const row:Recruit[]=[];
        for(const item of thing){
            const thingQuery = query(collection(db, "recruit"), where("thing", "array-contains", item));
            const thingQuerySnapshot = await getDocs(thingQuery);
            thingQuerySnapshot.forEach((doc) => {
                const docData=doc.data()
            const recruitid=doc.id
            const people=docData.people
            const recruitTitle=docData.recruitTitle
            const text=docData.text
            const thing=docData.thing
            const time=docData.time
            const userid=docData.userid
            const data:Recruit={recruitid,people,recruitTitle,text,thing,time,userid}
                if(!row.some((u)=>u.recruitid===recruitid)){
                row.push(data);}
                });
          }
          for (const item of time) {
            const timeQuery = query(collection(db, "recruit"), where("time", "array-contains", item));
            const timeQuerySnapshot = await getDocs(timeQuery);
            timeQuerySnapshot.forEach((doc) => {
                const docData=doc.data()
                const recruitid=doc.id
                const people=docData.people
                const recruitTitle=docData.recruitTitle
                const text=docData.text
                const thing=docData.thing
                const time=docData.time
                const userid=docData.userid
                const data:Recruit={recruitid,people,recruitTitle,text,thing,time,userid}
                if(!row.some((u)=>u.recruitid===recruitid)){
                row.push(data);}
            });
          }
          for (const item of people) {
            const peopleQuery = query(collection(db, "recruit"), where("people", "array-contains", item));
            const peopleQuerySnapshot = await getDocs(peopleQuery);
            peopleQuerySnapshot.forEach((doc) => {
                const docData=doc.data()
                const recruitid=doc.id
                const people=docData.people
                const recruitTitle=docData.recruitTitle
                const text=docData.text
                const thing=docData.thing
                const time=docData.time
                const userid=docData.userid
                const data:Recruit={recruitid,people,recruitTitle,text,thing,time,userid}
                if(!row.some((u)=>u.userid===userid)){
                row.push(data);}
            });
          }
          const uniqueRecruits = Array.from(new Set(row));
          if(uniqueRecruits.length!==0){
            setRecruits(uniqueRecruits);
            history.push("/home/co_developer/search/result")
        }else{
              showMessage({title:"募集が見つかりません",status:"error"})
            }
    }catch(error){

        showMessage({title:"募集情報の取得に失敗しました",status:"error"});
    }finally{
        setLoading1(false);
    }},[history,showMessage,setRecruits])
    return{recruitSearch,loading1,recruits}
}