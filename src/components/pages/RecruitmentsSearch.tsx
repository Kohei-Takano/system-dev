import { Box, Checkbox, CheckboxGroup, Divider, Flex, Heading, Input, Stack} from "@chakra-ui/react";
import {ChangeEvent, memo,useEffect,useState,VFC}from"react";

import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { MainButton } from "../atoms/button/MainButton";
import { useRecruitNameSearch } from "../../hooks/useRecruitNameSearch";
import { useRecruitSearch } from "../../hooks/useRecruitSearch";
export const RecruitmentsSearch: VFC = memo(()=>{
    const [recruitName,setRecruitName] =useState('');
    const [thing,setThing] =useState<string[]>([]);
    const [time,setTime]=useState<string[]>([]);
    const [people,setPeople]=useState<string[]>([]);
    const {recruitNameSearch,loading}=useRecruitNameSearch();
    const {recruitSearch,loading1}=useRecruitSearch();

    const onChangeRecruitName = (e: ChangeEvent<HTMLInputElement>)=>setRecruitName(e.target.value);
    const onChangeThing=(newSelectedThing: string[])=>setThing(newSelectedThing);
    const onChangeTime=(newSelectedTime:string[])=>setTime(newSelectedTime);
    const onChangePeople=(newSelectedPeople:string[])=>setPeople(newSelectedPeople);
    
    const history=useHistory();
    const onClickRecruitmentsNameSearchResult=()=>recruitNameSearch(recruitName);
    //history.push("/home/co_developer/search/result")
    const onClickRecruitmentsSearchResult=()=>recruitSearch(thing,time,people)
    //history.push("/home/co_developer/search/result")
    useEffect(() => {
        // ローカルストレージから情報を取得
        const storedInfo = localStorage.getItem("loggedInUser");
    
        if (!storedInfo) {
          history.push("/"); // ログインページへ遷移
        }
      }, [history]);
    return (
        <>
        <Heading as="h1" p={6} size="3xl" textAlign="center">共同開発者を探す</Heading>
        <Flex align="center" justify="center" height="320px">
            <Box bg="white" w="2xl" p={4} borderRadius="md" shadow="md">
                <Heading as="h1" p={6} size="xl" textAlign="center">募集タイトルで検索</Heading>
                <Stack spacing={6} py={4} px={10}>
                        <Input placeholder="募集タイトル名" value={recruitName} onChange={onChangeRecruitName}/>
                        <PrimaryButton disabled={ recruitName==="" } loading={loading} onClick={onClickRecruitmentsNameSearchResult}>検索</PrimaryButton>
                </Stack>
            </Box>
        </Flex>
        <Flex align="center" justify="center" height="1522px">
            <Box bg="white" w="2xl" p={4} borderRadius="md" shadow="md">
                <Heading as="h1" p={6} size="xl" textAlign="center">条件を指定して検索</Heading>
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
        <Stack spacing={6} py={4} px={10}>
            <PrimaryButton disabled={ thing.length ===0 && time.length===0 && people.length===0} loading={loading1} onClick={onClickRecruitmentsSearchResult}>検索</PrimaryButton>
        </Stack>
    </Box>  
    </Flex>
        </>
    )
});