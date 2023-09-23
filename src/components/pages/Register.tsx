import { Box, Divider, Flex, Heading, Input, Stack, Text } from "@chakra-ui/react";
import {ChangeEvent, memo,useEffect,useState,VFC}from"react";

import { useHistory } from "react-router-dom";
import { MainButton } from "../atoms/button/MainButton";
import { useAuth } from "../../hooks/useAuth";
import { useRegister } from "../../hooks/useRegister";

export const Register: VFC = memo(()=>{
    const{register,loading}=useRegister();
    const [mailAddress,setMailAddress] =useState('');
    const [password,setPassword]=useState('');
    const [password2,setPassword2]=useState('');

    const onChangeMailAddress = (e: ChangeEvent<HTMLInputElement>)=>setMailAddress(e.target.value);
    const onChangePassword = (e: ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value);
    const onChangePassword2 = (e: ChangeEvent<HTMLInputElement>)=>setPassword2(e.target.value);
    const history=useHistory();
    const onClickRegister=()=>{register(mailAddress,password,password2);}

    return( 
    <>
    <Flex align="center" justify="center"position="relative"minHeight={`calc(100vh - 120px)`}>
        <Box bg="white" w="md" p={4} borderRadius="md" shadow="md">
            <Heading as="h1" size="lg" textAlign="center">新規登録</Heading>
            <Divider my={4}/>
            <Stack spacing={6} py={4} px={10}>
                <Input placeholder="メールアドレス" value={mailAddress} onChange={onChangeMailAddress}/>
                <Text>※このメールアドレスは本サービス以外では利用いたしません。</Text>
                <Input placeholder="パスワード" value={password} onChange={onChangePassword}/>
                <Input placeholder="パスワード再入力" value={password2} onChange={onChangePassword2}/>
                <Text>※パスワードは8文字以上ご入力ください。</Text>
                <MainButton  loading={loading} onClick={onClickRegister}>登録</MainButton>
            </Stack>
        </Box>        
    </Flex>
    </>
    );
});