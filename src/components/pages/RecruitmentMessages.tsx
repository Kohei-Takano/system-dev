import {ChangeEvent, memo,useEffect,useState,VFC}from"react";
import { MainButton } from "../atoms/button/MainButton";
import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Box, Flex, Input, ListItem, Stack, Textarea, UnorderedList, Wrap, WrapItem } from "@chakra-ui/react";
import { useApplications } from "../../hooks/useApplications";
import { db } from "../../firebase";
import { collection,doc, onSnapshot } from "firebase/firestore";
import firebase from 'firebase/app';
import { useMessages } from "../../hooks/useMessages";
import { Message } from "../../types/api/message";
export const RecruitmentMessages: VFC = memo(()=>{
    const {messages, setMessages} = useMessages();
    const [messages1,setMessages1]=useState<string[]>([]);
    const [text,setText] =useState('');
    const{recruitId}=useParams<{ recruitId: string }>();
    const {applicationList,loading}=useApplications();
    const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>)=>setText(e.target.value);
    const history=useHistory();
    const onClickTitle=()=>history.push("/home/co_developer/recruitmentid")
    const onClickList=()=>applicationList(recruitId)//history.push(`/home/co_developer/${recruitId}/application_list`)
    const onClickSend=()=>{}
    const findMessages=messages.find((message:Message)=>{
        return message.recruitid===recruitId
    })
    
    useEffect(() => {
        if(findMessages && findMessages.messagesid){
        const unsub = onSnapshot(doc(db, "messages", findMessages.messagesid), (doc) => {
            if (doc) {
                const conversationData = doc.data();
                if (conversationData && conversationData.messages) {
                  setMessages1(conversationData.messages);
                }
        }}
        );  
            return ()=>{
                unsub();
            };
        }}
        ,[findMessages])
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
                    <MainButton loading={loading} onClick={onClickList}>参加申請一覧</MainButton>
                </Stack>
            </Box>
        </Flex>
        <UnorderedList>
            {messages1.map((message:string,index:number)=>(
                <ListItem key={index}>{message}</ListItem>
            ))}
        </UnorderedList>
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