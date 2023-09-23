import { doc, deleteDoc, query, collection, where, getDocs } from "firebase/firestore";
import { useMessage } from "./useMessage";
import { useCallback, useState } from "react";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import { User } from "../types/api/user";
import { useOtherUsers } from "./useOtherUsers";
import { useHistory } from "react-router-dom";

export const useSetOneUser=()=>{
    const {showMessage}=useMessage();

    const [loading,setLoading]=useState(false);
    const {users,setUsers}=useOtherUsers()
    const history=useHistory()

    const auth = getAuth();
    const setOneUser=useCallback(async(userid:string|undefined)=>{
        const row:User[]=[]
        try{
            if(userid){
        setLoading(true);
        const q = query(collection(db, "userinfo"), where("userid", "==", userid));
        const querySnapshot = await getDocs(q);

        if(!querySnapshot.empty){    
            querySnapshot.forEach((doc) => {
                const docData=doc.data()
                const industry:string[]=docData.industry
                const occupation:string[]=docData.occupation
                const programming:string[]=docData.programming
                const userid:string=docData.userid
                const username:string=docData.username
                const participationNumber=docData.participationNumber
                const url1:string=docData.url1
                const url2:string=docData.url2
                const data={industry,occupation,programming,userid,username,participationNumber,url1,url2}
                row.push(data);
            // doc.data() is never undefined for query doc snapshots
            });
                setUsers(row);
        }}else{showMessage({title:"ユーザが見つかりません",status:"error"})}
        }catch(error){
                showMessage({title:"ユーザデータを取得できませんでした",status:"error"})
            }finally{setLoading(false)}
        },[showMessage,auth,getDocs]);
        return{setOneUser,loading};    
}