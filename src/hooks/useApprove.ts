import { doc, deleteDoc, addDoc, collection, updateDoc, query, where, getDocs } from "firebase/firestore";
import { useMessage } from "./useMessage";
import { useCallback, useState } from "react";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import { useMembers } from "./useMembers";
import { useList } from "./useList";
import { User } from "../types/api/user";

export type Data={
  docId: string;
  participationNumber: number;
};
export const useApprove=()=>{
    const {showMessage}=useMessage();

    const [loading,setLoading]=useState(false);
    const [userid,setUserid]=useState<Data|null>();
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
                  const row:Data[]=[]
                  const q = query(collection(db, "userinfo"), where("userid", "==", findList?.userid));
                  const querySnapshot = await getDocs(q);
                  console.log(!querySnapshot.empty)
            if(!querySnapshot.empty){    
                querySnapshot.forEach((doc) => {
                const docData=doc.data()
                const participationNumber:number=docData.participationNumber
                const docId:string=doc.id
                const data={docId,participationNumber}
                row.push(data);
            // doc.data() is never undefined for query doc snapshots
            }); 
          
          
          
            
            if(row[0]){
              const newNumber=row[0].participationNumber+1
                await updateDoc(doc(db,'userinfo',row[0].docId),{
                  participationNumber:newNumber,
                })
              }
                showMessage({title:"応募申請を承認しました",status:"success"})
            }
            }
                setLoading(false);
                
        }}
        catch(error){
                showMessage({title:"応募申請を承認できませんでした",status:"error"})
            }finally{setLoading(false)}
        },[showMessage,auth,deleteDoc,updateDoc]);
        return{approve,loading};    
}