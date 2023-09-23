import { Heading } from "@chakra-ui/react";
import {memo,useEffect,VFC} from "react";
import { useHistory } from "react-router-dom";

export const Contact:VFC=memo(()=>{
    const history=useHistory();
    useEffect(() => {
        // ローカルストレージから情報を取得
        const storedInfo = localStorage.getItem("loggedInUser");
    
        if (!storedInfo) {
          history.push("/"); // ログインページへ遷移
        }
      }, [history]);
    return(
    <Heading as="h1" p={6} size="3xl" textAlign="center">お問い合わせ</Heading>
    )
});