import { Box, Divider, Flex, Heading, Input, Stack } from "@chakra-ui/react";
import {ChangeEvent, memo,useState,VFC}from"react";

import { useHistory } from "react-router-dom";
import { MainButton } from "../atoms/button/MainButton";
import { useAuth } from "../../hooks/useAuth";

export const Register: VFC = memo(()=>{
    const{login,loading}=useAuth();
    const [mailAddress,setMailAddress] =useState('');

    const onChangeMailAddress = (e: ChangeEvent<HTMLInputElement>)=>setMailAddress(e.target.value);
    const history=useHistory();
    const onClickRegister=()=>history.push("/home/user_info")

    return( 
    <>
    <Flex align="center" justify="center" height="70vh">
        <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
            <Heading as="h1" size="lg" textAlign="center">新規登録</Heading>
            <Divider my={4}/>
            <Stack spacing={6} py={4} px={10}>
                <Input placeholder="メールアドレス" value={mailAddress} onChange={onChangeMailAddress}/>
                <Input placeholder="パスワード"/>
                <Input placeholder="パスワード再入力"/>
                <Input placeholder="ユーザ名"/>
                <MainButton  loading={loading} onClick={onClickRegister}>登録</MainButton>
            </Stack>
        </Box>        
    </Flex>
    </>
    );
});