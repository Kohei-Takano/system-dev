import { Box, Flex, Stack } from "@chakra-ui/react";
import {memo,useEffect,VFC}from"react";
import { MainButton } from "../atoms/button/MainButton";
import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useOtherUsers } from "../../hooks/useOtherUsers";
export const UserMessages: VFC = memo(()=>{
    const{login,loading}=useAuth();
    const {userId}=useParams<{ userId: string }>();
    const {users}=useOtherUsers();
    const history=useHistory();
    const onClickUser=()=>history.push(`/home/user_search/result/${userId}`)
    useEffect(() => {
        // ローカルストレージから情報を取得
        const storedInfo = localStorage.getItem("loggedInUser");
    
        if (!storedInfo) {
          history.push("/"); // ログインページへ遷移
        }
      }, [history]);
      const findUser=users.find((user)=>{
        return user.userid===userId
      })
    return (
        <Flex align="left" justify="left" >
        <Box w="sm">
            <Stack spacing={6} py={4} px={10}>
                <MainButton loading={loading} onClick={onClickUser}>{findUser?.username}</MainButton>
            </Stack>
        </Box>
        </Flex>
    )
});