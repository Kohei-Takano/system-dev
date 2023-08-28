import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import {memo,useEffect,VFC}from"react";
import { MainButton } from "../atoms/button/MainButton";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
export const UserDetail: VFC = memo(()=>{
    const{login,loading}=useAuth();
    const history=useHistory();
    const onClickGoUserMessages=()=>history.push("/home/user_search/result/user_detail/userid")
    useEffect(() => {
        // ローカルストレージから情報を取得
        const storedInfo = localStorage.getItem("loggedInUser");
    
        if (!storedInfo) {
          history.push("/"); // ログインページへ遷移
        }
      }, [history]);
    return (
    <>
    <Heading as="h1" p={6} size="xl" textAlign="center">ユーザ情報</Heading>
    <Flex align="center" justify="center" height="30vh">
        <Box w="sm">
            <Stack spacing={6} py={4} px={10}>
                <MainButton loading={loading} onClick={onClickGoUserMessages}>メッセージを送る</MainButton>
            </Stack>
        </Box>
    </Flex>
    </>
    )
});