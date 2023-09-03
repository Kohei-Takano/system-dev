import { doc, deleteDoc, addDoc, collection, updateDoc } from "firebase/firestore";
import { useMessage } from "./useMessage";
import { useCallback, useState } from "react";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import { useMembers } from "./useMembers";
import { useList } from "./useList";

export const useApprove=()=>{
    const {showMessage}=useMessage();

    const [loading,setLoading]=useState(false);
    const {members}=useMembers();
    const {list}=useList();

    const auth = getAuth();
    const approve=useCallback(async(applicationid:string|undefined,recruitid:string|undefined)=>{
        try{
            setLoading(true);
            if(applicationid){
            const findMember=members.find((member)=>{
                return member.recruitid===recruitid
              })
            const findList=list.find((oneList)=>{
                return oneList.applicationid===applicationid
            })
            if(findMember && findList){
                findMember.teamMembers.push(findList?.userid)
                await updateDoc(doc(db,'members',findMember.teamid), {
                    teamMembers: findMember.teamMembers, // 配列のフィールドを新しいデータで更新
                  });
                  await deleteDoc(doc(db, 'application', applicationid));
                  for (let i = 0; i < list.length; i++) {
                    if (list[i] === findList) {
                      list.splice(i, 1); // 指定した値を削除
                      i--; // 配列が縮小したため、インデックスを調整
                    }
                  }
                
                
                showMessage({title:"応募申請を承認しました",status:"success"})
                }
            }
                setLoading(false);
                
        }
        catch(error){
                showMessage({title:"応募申請を承認できませんでした",status:"error"})
            }finally{setLoading(false)}
        },[showMessage,auth,deleteDoc,updateDoc]);
        return{approve,loading};    
}