import { Box, Flex, Heading, Input, Stack, Textarea } from "@chakra-ui/react";
import {ChangeEvent, memo,useEffect,useState,VFC}from"react";
import { MainButton } from "../atoms/button/MainButton";
import { useAuth } from "../../hooks/useAuth";
import { useHistory, useParams } from "react-router-dom";
import { useApply } from "../../hooks/useApply";
export const ApplicationMessage: VFC = memo(()=>{
    const [text,setText] =useState('');
    const {recruitId}=useParams<{ recruitId: string }>();
    const {apply,loading}=useApply();
    const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>)=>setText(e.target.value);
    const history=useHistory();
    const onClickContent=()=>apply(text,recruitId)
    //history.push("/home/co_developer/search/result/detail/application/content")
    useEffect(() => {
        // ローカルストレージから情報を取得
        const storedInfo = localStorage.getItem("loggedInUser");
    
        if (!storedInfo) {
          history.push("/"); // ログインページへ遷移
        }
      }, [history]);
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