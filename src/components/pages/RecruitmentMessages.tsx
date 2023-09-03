import {ChangeEvent, memo,useEffect,useState,VFC}from"react";
import { MainButton } from "../atoms/button/MainButton";
import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Box, Flex, Input, Stack, Textarea, Wrap, WrapItem } from "@chakra-ui/react";
import { useApplications } from "../../hooks/useApplications";
export const RecruitmentMessages: VFC = memo(()=>{
    
    const [text,setText] =useState('');
    const{recruitId}=useParams<{ recruitId: string }>();
    const {applicationList,loading}=useApplications();
    const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>)=>setText(e.target.value);
    const history=useHistory();
    const onClickTitle=()=>history.push("/home/co_developer/recruitmentid")
    const onClickList=()=>applicationList(recruitId)//history.push(`/home/co_developer/${recruitId}/application_list`)
    const onClickSend=()=>{}
    useEffect(() => {
        // ローカルストレージから情報を取得
        const storedInfo = localStorage.getItem("loggedInUser");
    
        if (!storedInfo) {
          history.push("/"); // ログインページへ遷移
        }
      }, [history]);
    return (
        <>
        <Flex align="left" justify="left">
            <Box w="sm">
                <Stack spacing={6} py={4} px={10}>
                    <MainButton loading={loading} onClick={onClickTitle}>募集タイトル</MainButton>
                </Stack>
            </Box>
            <Box w="sm">
                <Stack spacing={6} py={4} px={10}>
                    <MainButton loading={loading} onClick={onClickList}>参加申請一覧</MainButton>
                </Stack>
            </Box>
        </Flex>
        <Wrap justify="center">
            <WrapItem>
            <Box w="lg"> 
                <Textarea placeholder="メッセージ" borderColor="darkgray" size="sm" value={text} onChange={onChangeText} borderRadius={10}/>
            </Box> 
            </WrapItem>
            <WrapItem >
                <Box w="sm"> 
                    <MainButton  loading={loading} onClick={onClickSend}>送信</MainButton>
                </Box> 
        
            </WrapItem>
        </Wrap>
        </>
    )
});