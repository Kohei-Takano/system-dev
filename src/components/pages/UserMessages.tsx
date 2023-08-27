import { Box, Flex, Stack } from "@chakra-ui/react";
import {memo,VFC}from"react";
import { MainButton } from "../atoms/button/MainButton";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
export const UserMessages: VFC = memo(()=>{
    const{login,loading}=useAuth();
    const history=useHistory();
    const onClickUser=()=>history.push("/home/user_search/result/user_detail")
    return (
        <Flex align="left" justify="left" >
        <Box w="sm">
            <Stack spacing={6} py={4} px={10}>
                <MainButton loading={loading} onClick={onClickUser}>相手のユーザ名</MainButton>
            </Stack>
        </Box>
        </Flex>
    )
});