import { Box, Flex, Heading, Input, Stack, Textarea } from "@chakra-ui/react";
import {ChangeEvent, memo,useState,VFC}from"react";
import { MainButton } from "../atoms/button/MainButton";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
export const ApplicationMessage: VFC = memo(()=>{
    const{login,loading}=useAuth();
    const [text,setText] =useState('');
    const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>)=>setText(e.target.value);
    const history=useHistory();
    const onClickContent=()=>history.push("/home/co_developer/search/result/detail/application/content")
    return (
        <>
        <Heading as="h1" p={6} size="3xl" textAlign="center">応募メッセージ編集</Heading>
        <Flex align="center" justify="center" height="320px">
            <Box bg="white" w="2xl" p={4} borderRadius="md" shadow="md">
                <Stack spacing={6} py={4} px={10}>
                        <Textarea placeholder="応募メッセージ" size="lg" value={text} onChange={onChangeText}/>
                        <MainButton loading={loading} onClick={onClickContent}>送信</MainButton>
                </Stack>
            </Box>
        </Flex>
        </>
    )
});