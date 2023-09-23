import { Heading, Text } from "@chakra-ui/react";
import {memo,useEffect,VFC} from "react";
import { useHistory } from "react-router-dom";

export const Privacy:VFC=memo(()=>{
    const history=useHistory();
    useEffect(() => {
        // ローカルストレージから情報を取得
        const storedInfo = localStorage.getItem("loggedInUser");
    
        if (!storedInfo) {
          history.push("/"); // ログインページへ遷移
        }
      }, [history]);
    return(
        <>
        <Heading as="h1" p={6} size="3xl" textAlign="center">個人情報保護方針</Heading>
        <Heading as="h2" p={6} size="xl" textAlign="center">個人情報の取り扱いについて</Heading>
        <Text></Text>
        </>
    );
});