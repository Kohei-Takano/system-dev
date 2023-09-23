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
export const useUsernameSearch=()=>{
    const history=useHistory();
    const {showMessage}=useMessage();
    
    const {users,setUsers}=useOtherUsers();

    const [loading,setLoading]=useState(false);
    const usernameSearch=useCallback(async(username:string)=>{
        setLoading(true);
    try{
        const q = query(collection(db, "userinfo"), where("username", "==", username));

    const querySnapshot = await getDocs(q);
    if(!querySnapshot.empty){
        
        const row:User[]=[]
    
        querySnapshot.forEach((doc) => {
            const docData=doc.data()
            const industry=docData.industry
            const occupation=docData.occupation
            const programming=docData.programming
            const userid=docData.userid
            const username=docData.username
            const participationNumber=docData.participationNumber
            const url1=docData.url1
            const url2=docData.url2
            const data:User={industry,occupation,programming,userid,username,participationNumber,url1,url2}
            row.push(data);
        // doc.data() is never undefined for query doc snapshots
        });
            setUsers(row);
            history.push("/home/user_search/result")
    }else{
        showMessage({title:"ユーザが見つかりませんでした",status:"error"});
    
    }
    }catch(error){
        showMessage({title:"ユーザ取得に失敗しました",status:"error"});
    }finally{
        setLoading(false);
    }},[history,showMessage,setUsers])
    return{usernameSearch,loading,users}
}