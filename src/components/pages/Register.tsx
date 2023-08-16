import { Box, Divider, Flex, Heading, Input, Stack } from "@chakra-ui/react";
import {ChangeEvent, memo,useState,VFC}from"react";

import { useHistory } from "react-router-dom";
import { MainButton } from "../atoms/button/MainButton";
import { useAuth } from "../../hooks/useAuth";

export const Register: VFC = memo(()=>{
    const{login,loading}=useAuth();
    const history=useHistory();
    const onClickRegister=()=>history.push("/home/user_info")

    return( 
    <>
    <Flex align="center" justify="center" height="30vh">
        <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
            <Heading as="h1" size="lg" textAlign="center">新規登録はこちら</Heading>
            <Divider my={4}/>
            <Stack spacing={6} py={4} px={10}>
                <MainButton  loading={loading} onClick={onClickRegister}>登録</MainButton>
            </Stack>
        </Box>        
    </Flex>
    </>
    );
});