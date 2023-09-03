import { useCallback, useState } from "react"
import { User } from "../types/api/user";
import { List } from "../types/api/list";

type Props={
    id:string;
    list:Array<List>
    onOpen:()=>void;
}
//選択したユーザ情報を特定しモーダルを表示するカスタムフック
export const useSelectUser=()=>{
    const[selectedUser,setSelectedUser]=useState<List | null>(null);

    const onSelectUser=useCallback((props:Props)=>{
        const{id,list,onOpen}=props;
        const targetUser=list.find((oneList)=>oneList.applicationid===id);
        setSelectedUser(targetUser??null)
        onOpen()
    },[])
    return{onSelectUser, selectedUser}
}