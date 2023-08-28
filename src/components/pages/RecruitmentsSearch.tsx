import { Box, Checkbox, CheckboxGroup, Divider, Flex, Heading, Input, Stack} from "@chakra-ui/react";
import {ChangeEvent, memo,useEffect,useState,VFC}from"react";

import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { MainButton } from "../atoms/button/MainButton";
export const RecruitmentsSearch: VFC = memo(()=>{
    const{login,loading}=useAuth();
    const [userName,setUserName] =useState('');
    const [industry,setIndustry] =useState<string[]>([]);
    const [occupation,setOccupation]=useState<string[]>([]);
    const [programming,setProgramming]=useState<string[]>([]);

    const onChangeUserName = (e: ChangeEvent<HTMLInputElement>)=>setUserName(e.target.value);
    const onChangeIndustry=(newSelectedIndustries: string[])=>setIndustry(newSelectedIndustries);
    const onChangeOccupation=(newSelectedOccupation:string[])=>setOccupation(newSelectedOccupation);
    const onChangeProgramming=(newSelectedProgramming:string[])=>setProgramming(newSelectedProgramming);
    
    const history=useHistory();
    const onClickRecruitmentsSearchResult=()=>history.push("/home/co_developer/search/result")
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
                        <Input placeholder="募集タイトル名" value={userName} onChange={onChangeUserName}/>
                        <MainButton loading={loading} onClick={onClickRecruitmentsSearchResult}>検索</MainButton>
                </Stack>
            </Box>
        </Flex>
        <Flex align="center" justify="center" height="1522px">
            <Box bg="white" w="2xl" p={4} borderRadius="md" shadow="md">
                <Heading as="h1" p={6} size="xl" textAlign="center">条件を指定して検索</Heading>
            <Heading as="h1" size="lg" textAlign="center">開発物の内容</Heading>
            <Divider my={4}/>
            <CheckboxGroup onChange={onChangeIndustry} defaultValue={[]}>
            <Stack direction='column' spacing={6} py={4} px={10}>
                <Checkbox value='1'>情報処理サービス業界</Checkbox>
                <Checkbox value='2'>ゲーム業界</Checkbox>
                <Checkbox value='3'>Web・インターネット業界</Checkbox>
                <Checkbox value='4'>ハードウェア業界</Checkbox>
                <Checkbox value='5'>ソフトウェア業界</Checkbox>
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
        <Stack spacing={6} py={4} px={10}>
            <MainButton  loading={loading} onClick={onClickRecruitmentsSearchResult}>検索</MainButton>
        </Stack>
    </Box>  
    </Flex>
        </>
    )
});