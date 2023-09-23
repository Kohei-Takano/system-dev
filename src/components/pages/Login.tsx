import { Box, Divider, Flex, Heading, Input, Stack } from "@chakra-ui/react";
import {ChangeEvent, memo,useState,VFC}from"react";

import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { MainButton } from "../atoms/button/MainButton";

export const Login: VFC = memo(()=>{
    const{login,loading}=useAuth();
    const [userId,setUserId] =useState('');
    const [password,setPassword] =useState('');

    const onChangeUserId = (e: ChangeEvent<HTMLInputElement>)=>setUserId(e.target.value);
    const onChangePassword=(e: ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value);
    const onClickLogin=()=>login(userId,password);
    
    const history=useHistory();
    const onClickGoRegister=()=>history.push("/register")

    return( 
    <>
    <Heading as="h1" p={6} size="3xl" textAlign="center">Collaboration Park</Heading>
    <Heading as="h2" p={6} size="md" textAlign="center">Let's find co-developers easily!</Heading>
    <Flex align="center" justify="center" height="360px">
        <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
            <Heading as="h1" size="lg" textAlign="center">ログイン</Heading>
            <Divider my={4}/>
            <Stack spacing={6} py={4} px={10}>
                <Input placeholder="登録済みメールアドレス" value={userId} onChange={onChangeUserId}/>
                <Input placeholder="パスワード" value={password}onChange={onChangePassword}/>
                <PrimaryButton disabled={userId ===""} loading={loading} onClick={onClickLogin}>ログイン</PrimaryButton>
            </Stack>
        </Box>        
    </Flex>
    <Flex align="center" justify="center" height="180px"mb={9}>
        <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
            <Heading as="h1" size="lg" textAlign="center">新規登録はこちら</Heading>
            <Divider my={4}/>
            <Stack spacing={6} py={4} px={10}>
                <MainButton  loading={loading} onClick={onClickGoRegister}>新規登録</MainButton>
            </Stack>
        </Box>        
    </Flex>
    </>
    );
});