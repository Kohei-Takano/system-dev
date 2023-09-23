import { collection, query, where, getDocs, DocumentData } from "firebase/firestore";
import { db } from "../firebase";
import { useHistory } from "react-router-dom";
import { useMessage } from "./useMessage";
import { useCallback, useState } from "react";
import { User } from "../types/api/user";
import { useLoginUser } from "./useLoginUser";
import { useOtherUsers } from "./useOtherUsers";
export type Data={
    industry: string[];
    occupation: string[];
    programming:string[];
    userid:string;
    username: string;
};
export const useUsersSearch=()=>{
    const history=useHistory();
    const {showMessage}=useMessage();
    
    const {users,setUsers}=useOtherUsers();

    const [loading1,setLoading1]=useState(false);
    const userSearch=useCallback(async(industry:string[],occupation:string[],programming:string[])=>{
        setLoading1(true);
    try{
        const row:User[]=[];
        for(const item of industry){
            const industryQuery = query(collection(db, "userinfo"), where("industry", "array-contains", item));
            const industryQuerySnapshot = await getDocs(industryQuery);
            industryQuerySnapshot.forEach((doc) => {
              const docData= doc.data();
              const industry=docData.industry
                const occupation=docData.occupation
                const programming=docData.programming
                const userid=docData.userid
                const username=docData.username
                const participationNumber=docData.participationNumber
                const url1=docData.url1
                const url2=docData.url2
                const data:User={industry,occupation,programming,userid,username,participationNumber,url1,url2}
                if(!row.some((u)=>u.userid===userid)){
                row.push(data);}
                });
          }
          for (const item of occupation) {
            const occupationQuery = query(collection(db, "userinfo"), where("occupation", "array-contains", item));
            const occupationQuerySnapshot = await getDocs(occupationQuery);
            occupationQuerySnapshot.forEach((doc) => {
              const docData = doc.data();
              const industry=docData.industry
                const occupation=docData.occupation
                const programming=docData.programming
                const userid=docData.userid
                const username=docData.username
                const participationNumber=docData.participationNumber
                const url1=docData.url1
                const url2=docData.url2
                const data:User={industry,occupation,programming,userid,username,participationNumber,url1,url2}
                if(!row.some((u)=>u.userid===userid)){
                row.push(data);}
            });
          }
          for (const item of programming) {
            const programmingQuery = query(collection(db, "userinfo"), where("programming", "array-contains", item));
            const programmingQuerySnapshot = await getDocs(programmingQuery);
            programmingQuerySnapshot.forEach((doc) => {
              const docData = doc.data();
              const industry=docData.industry
                const occupation=docData.occupation
                const programming=docData.programming
                const userid=docData.userid
                const username=docData.username
                const participationNumber=docData.participationNumber
                const url1=docData.url1
                const url2=docData.url2
                const data:User={industry,occupation,programming,userid,username,participationNumber,url1,url2}
                if(!row.some((u)=>u.userid===userid)){
                row.push(data);}
            });
          }
          const uniqueUsers = Array.from(new Set(row));
          if(uniqueUsers.length!==0){
            setUsers(uniqueUsers);
            history.push("/home/user_search/result")}else{
              showMessage({title:"ユーザが見つかりません",status:"error"})
            }
    }catch(error){

        showMessage({title:"ユーザ取得に失敗しました",status:"error"});
    }finally{
        setLoading1(false);
    }},[history,showMessage,setUsers])
    return{userSearch,loading1,users}
}