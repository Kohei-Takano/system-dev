import { Box, Checkbox, CheckboxGroup, Divider, Flex, Heading, Input, Stack} from "@chakra-ui/react";
import {ChangeEvent, memo,useEffect,useState,VFC}from"react";

import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { MainButton } from "../atoms/button/MainButton";
import { useUsernameSearch } from "../../hooks/useUsernameSearch";
import { useUsersSearch } from "../../hooks/useUsersSearch";

export const UserSearch: VFC = memo(()=>{
    const [userName,setUserName] =useState('');
    const [industry,setIndustry] =useState<string[]>([]);
    const [occupation,setOccupation]=useState<string[]>([]);
    const [programming,setProgramming]=useState<string[]>([]);
    const {usernameSearch,loading}=useUsernameSearch();
    const {userSearch,loading1}=useUsersSearch();

    const onChangeUserName = (e: ChangeEvent<HTMLInputElement>)=>setUserName(e.target.value);
    const onChangeIndustry=(newSelectedIndustries: string[])=>setIndustry(newSelectedIndustries);
    const onChangeOccupation=(newSelectedOccupation:string[])=>setOccupation(newSelectedOccupation);
    const onChangeProgramming=(newSelectedProgramming:string[])=>setProgramming(newSelectedProgramming);
    
    const history=useHistory();
    const onClickUsernameSearch=()=>usernameSearch(userName);
    const onClickUserSearch=()=>userSearch(industry,occupation,programming);
    useEffect(() => {
        // ローカルストレージから情報を取得
        const storedInfo = localStorage.getItem("loggedInUser");
    
        if (!storedInfo) {
          history.push("/"); // ログインページへ遷移
        }
      }, [history]);

    return( 
        <>
        <Heading as="h1" p={6} size="3xl" textAlign="center">ユーザ検索</Heading>
        <Flex align="center" justify="center" height="320px">
            <Box bg="white" w="2xl" p={4} borderRadius="md" shadow="md">
                <Heading as="h1" p={6} size="xl" textAlign="center">ユーザ名で検索</Heading>
                <Stack spacing={6} py={4} px={10}>
                        <Input placeholder="ユーザ名" value={userName} onChange={onChangeUserName}/>
                        <PrimaryButton disabled={userName ===""} loading={loading} onClick={onClickUsernameSearch}>検索</PrimaryButton>
                </Stack>
            </Box>
        </Flex>
        <Flex align="center" justify="center" height="2050px">
            <Box bg="white" w="2xl" p={4} borderRadius="md" shadow="md">
                <Heading as="h1" p={6} size="xl" textAlign="center">条件を指定して検索</Heading>
            <Heading as="h1" size="lg" textAlign="center">志望業界・現在の業界</Heading>
            <Divider my={4}/>
            <CheckboxGroup onChange={onChangeIndustry} defaultValue={[]}>
            <Stack direction='column' spacing={6} py={4} px={10}>
                <Checkbox value='情報処理サービス業界'>情報処理サービス業界</Checkbox>
                <Checkbox value='ゲーム業界'>ゲーム業界</Checkbox>
                <Checkbox value='Web・インターネット業界'>Web・インターネット業界</Checkbox>
                <Checkbox value='ハードウェア業界'>ハードウェア業界</Checkbox>
                <Checkbox value='ソフトウェア業界'>ソフトウェア業界</Checkbox>
            </Stack>
            </CheckboxGroup>
        
        <Heading as="h1" size="lg" textAlign="center">志望職種・現在の職種</Heading>
        <Divider my={4}/>
        <CheckboxGroup onChange={onChangeOccupation} defaultValue={[]}>
        <Stack direction='column' spacing={6} py={4} px={10}>
            <Checkbox value='1'>システムエンジニア</Checkbox>
            <Checkbox value='2'>プログラマー</Checkbox>
            <Checkbox value='3'>ネットワークエンジニア</Checkbox>
            <Checkbox value='4'>ハードウェアエンジニア</Checkbox>
            <Checkbox value='5'>組み込みエンジニア</Checkbox>
            <Checkbox value='6'>ITコンサルタント</Checkbox>
            <Checkbox value='7'>セールスエンジニア</Checkbox>
            <Checkbox value='8'>Webデザイナー</Checkbox>
            <Checkbox value='9'>ゲームプランナー</Checkbox>
            <Checkbox value='10'>ゲームプログラマー（ゲーム開発）</Checkbox>
            <Checkbox value='11'>ゲームプログラマー（ゲーム開発支援）</Checkbox>
            <Checkbox value='12'>ゲームプログラマー（バックエンドプログラマー）</Checkbox>
            <Checkbox value='13'>ゲームデザイナー</Checkbox>
        </Stack>
        </CheckboxGroup>

    
        <Heading as="h1" size="lg" textAlign="center">得意なプログラミング言語</Heading>
        <Divider my={4}/>
        <CheckboxGroup onChange={onChangeProgramming} defaultValue={[]}>
        <Stack direction='column' spacing={6} py={4} px={10}>
            <Checkbox value='Python'>Python</Checkbox>
            <Checkbox value='JavaScript'>JavaScript</Checkbox>
            <Checkbox value='Ruby'>Ruby</Checkbox>
            <Checkbox value='Java'>Java</Checkbox>
            <Checkbox value='Swift'>Swift</Checkbox>
            <Checkbox value='Go'>Go</Checkbox>
            <Checkbox value='C'>C</Checkbox>
            <Checkbox value='C++'>C++</Checkbox>
            <Checkbox value='C#'>C#</Checkbox>
            <Checkbox value='TypeScript'>TypeScript</Checkbox>
            <Checkbox value='PHP'>PHP</Checkbox>
            <Checkbox value='Kotlin'>Kotlin</Checkbox>
            <Checkbox value='Perl'>Perl</Checkbox>
            <Checkbox value='Scala'>Scala</Checkbox>
            <Checkbox value='VisualBasic.NET'>VisualBasic.NET</Checkbox>
        </Stack>
        </CheckboxGroup>
        <Stack spacing={6} py={4} px={10}>
            <PrimaryButton disabled={ industry.length ===0 && occupation.length===0 && programming.length===0} loading={loading1} onClick={onClickUserSearch}>検索</PrimaryButton>
        </Stack>
    </Box>  
    </Flex>
    

</>
    );
});