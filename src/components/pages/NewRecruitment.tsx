import { Box, Checkbox, CheckboxGroup, Divider, Flex, Heading, Input, Stack, Textarea} from "@chakra-ui/react";
import {ChangeEvent, memo,useEffect,useState,VFC}from"react";

import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { MainButton } from "../atoms/button/MainButton";
export const NewRecruitment: VFC = memo(()=>{
    const{login,loading}=useAuth();
    const [userName,setUserName] =useState('');
    const [industry,setIndustry] =useState<string[]>([]);
    const [occupation,setOccupation]=useState<string[]>([]);
    const [programming,setProgramming]=useState<string[]>([]);
    const [text,setText] =useState('');
    
    const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>)=>setText(e.target.value);
    const onChangeUserName = (e: ChangeEvent<HTMLInputElement>)=>setUserName(e.target.value);
    const onChangeIndustry=(newSelectedIndustries: string[])=>setIndustry(newSelectedIndustries);
    const onChangeOccupation=(newSelectedOccupation:string[])=>setOccupation(newSelectedOccupation);
    const onChangeProgramming=(newSelectedProgramming:string[])=>setProgramming(newSelectedProgramming);
    
    const history=useHistory();
    const onClickRecruit=()=>history.push("/home/co_developer/recruitmentid")
    useEffect(() => {
        // ローカルストレージから情報を取得
        const storedInfo = localStorage.getItem("loggedInUser");
    
        if (!storedInfo) {
          history.push("/"); // ログインページへ遷移
        }
      }, [history]);
    return (
        <>
        <Heading as="h1" p={6} size="3xl" textAlign="center">新規募集</Heading>
        <Flex align="center" justify="center" height="1850px">
            <Box bg="white" w="2xl" p={4} borderRadius="md" shadow="md">
                <Heading as="h1" p={12} size="xl" textAlign="center">募集要件</Heading>
            <Heading as="h1" size="lg" textAlign="center">開発物の内容</Heading>
            <Divider my={4}/>
            <CheckboxGroup onChange={onChangeIndustry} defaultValue={[]}>
            <Stack direction='column' spacing={6} py={4} px={10}>
                <Checkbox value='1'>Webサービス</Checkbox>
                <Checkbox value='2'>ゲーム</Checkbox>
                <Checkbox value='3'>アート</Checkbox>
                <Checkbox value='4'>その他</Checkbox>
            </Stack>
            </CheckboxGroup>
        
        <Heading as="h1" size="lg" textAlign="center">予想開発期間</Heading>
        <Divider my={4}/>
        <CheckboxGroup onChange={onChangeOccupation} defaultValue={[]}>
        <Stack direction='column' spacing={6} py={4} px={10}>
            <Checkbox value='1'>3カ月以下</Checkbox>
            <Checkbox value='2'>4カ月</Checkbox>
            <Checkbox value='3'>5カ月</Checkbox>
            <Checkbox value='4'>6カ月</Checkbox>
            <Checkbox value='5'>7カ月</Checkbox>
            <Checkbox value='6'>8カ月</Checkbox>
            <Checkbox value='7'>9カ月</Checkbox>
            <Checkbox value='8'>10カ月</Checkbox>
            <Checkbox value='9'>11カ月</Checkbox>
            <Checkbox value='10'>1年</Checkbox>
            <Checkbox value='11'>1年以上</Checkbox>
        </Stack>
        </CheckboxGroup>

    
        <Heading as="h1" size="lg" textAlign="center">人数</Heading>
        <Divider my={4}/>
        <CheckboxGroup onChange={onChangeProgramming} defaultValue={[]}>
        <Stack direction='column' spacing={6} py={4} px={10}>
            <Checkbox value='1'>2～4人</Checkbox>
            <Checkbox value='2'>5～7人</Checkbox>
            <Checkbox value='3'>8～10人</Checkbox>
            <Checkbox value='4'>11～13人</Checkbox>
            <Checkbox value='5'>14～16人</Checkbox>
            <Checkbox value='6'>17人以上</Checkbox>
        </Stack>
        </CheckboxGroup>
        <Heading as="h1" size="lg" textAlign="center">募集タイトル</Heading>
        <Divider my={4}/>
        <Stack spacing={6} py={4} px={10}>
            <Input placeholder="募集タイトル名" value={userName} onChange={onChangeUserName}/>
        </Stack>
        <Heading as="h1" size="lg" textAlign="center">募集の詳細情報を記入</Heading>
        <Divider my={4}/>
        <Stack spacing={6} py={4} px={10}>
            <Textarea placeholder="募集詳細" size="lg" value={text} onChange={onChangeText}/>
        </Stack>
        <Stack spacing={6} py={4} px={10}>
            <MainButton  loading={loading} onClick={onClickRecruit}>募集</MainButton>
        </Stack>
    </Box>  
    </Flex>
        </>
    )
});