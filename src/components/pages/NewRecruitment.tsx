import { Box, Checkbox, CheckboxGroup, Divider, Flex, Heading, Input, Stack, Textarea} from "@chakra-ui/react";
import {ChangeEvent, memo,useEffect,useState,VFC}from"react";

import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { MainButton } from "../atoms/button/MainButton";
import { useNewRecruit } from "../../hooks/useNewRecruit";


export const NewRecruitment: VFC = memo(()=>{
    const {newRecruit,loading}=useNewRecruit();
    const [recruitTitle,setRecruitTitle] =useState('');
    const [thing,setThing] =useState<string[]>([]);
    const [time,setTime]=useState<string[]>([]);
    const [people,setPeople]=useState<string[]>([]);
    const [text,setText] =useState('');
    
    const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>)=>setText(e.target.value);
    const onChangeRecruitTitle = (e: ChangeEvent<HTMLInputElement>)=>setRecruitTitle(e.target.value);
    const onChangeThing=(newSelectedIndustries: string[])=>setThing(newSelectedIndustries);
    const onChangeTime=(newSelectedOccupation:string[])=>setTime(newSelectedOccupation);
    const onChangePeople=(newSelectedProgramming:string[])=>setPeople(newSelectedProgramming);
    
    const history=useHistory();
    const onClickRecruit=()=>newRecruit(recruitTitle,text,thing,time,people)
    //history.push("/home/co_developer/recruitmentid")
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
            <CheckboxGroup onChange={onChangeThing} defaultValue={[]}>
            <Stack direction='column' spacing={6} py={4} px={10}>
                <Checkbox value='1'>Webサービス</Checkbox>
                <Checkbox value='2'>ゲーム</Checkbox>
                <Checkbox value='3'>アート</Checkbox>
                <Checkbox value='4'>サウンド</Checkbox>
                <Checkbox value='5'>その他</Checkbox>
            </Stack>
            </CheckboxGroup>
        
        <Heading as="h1" size="lg" textAlign="center">予想開発期間</Heading>
        <Divider my={4}/>
        <CheckboxGroup onChange={onChangeTime} defaultValue={[]}>
        <Stack direction='column' spacing={6} py={4} px={10}>
            <Checkbox value='1'>半日</Checkbox>
            <Checkbox value='2'>1日</Checkbox>
            <Checkbox value='3'>2～3日</Checkbox>
            <Checkbox value='4'>4～5日</Checkbox>
            <Checkbox value='5'>6～7日</Checkbox>
            <Checkbox value='6'>2週間以内</Checkbox>
            <Checkbox value='7'>1カ月以内</Checkbox>
            <Checkbox value='8'>3カ月以内</Checkbox>
            <Checkbox value='9'>半年以内</Checkbox>
            <Checkbox value='10'>1年以内</Checkbox>
            <Checkbox value='11'>1年以上</Checkbox>
        </Stack>
        </CheckboxGroup>

    
        <Heading as="h1" size="lg" textAlign="center">人数</Heading>
        <Divider my={4}/>
        <CheckboxGroup onChange={onChangePeople} defaultValue={[]}>
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
            <Input placeholder="募集タイトル名" value={recruitTitle} onChange={onChangeRecruitTitle}/>
        </Stack>
        <Heading as="h1" size="lg" textAlign="center">募集の詳細情報を記入</Heading>
        <Divider my={4}/>
        <Stack spacing={6} py={4} px={10}>
            <Textarea placeholder="募集詳細" size="lg" value={text} onChange={onChangeText}/>
        </Stack>
        <Stack spacing={6} py={4} px={10}>
            <PrimaryButton disabled={ recruitTitle ==="" || thing.length===0 || time.length===0||people.length===0||text===""} loading={loading} onClick={onClickRecruit}>募集</PrimaryButton>
        </Stack>
    </Box>  
    </Flex>
        </>
    )
});