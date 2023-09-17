import { Box, Checkbox, CheckboxGroup, Divider, Flex, Heading, Input, Stack} from "@chakra-ui/react";
import {ChangeEvent, memo,useEffect,useState,VFC}from"react";

import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { MainButton } from "../atoms/button/MainButton";
import { useUserRegister } from "../../hooks/useUserRegister";

export const UserRegister: VFC = memo(()=>{
    const {userRegister,loading}=useUserRegister();
    const [username,setUsername]=useState('');
    const [industry,setIndustry] =useState<string[]>([]);
    const [occupation,setOccupation]=useState<string[]>([]);
    const [programming,setProgramming]=useState<string[]>([]);

    const onChangeUsername = (e: ChangeEvent<HTMLInputElement>)=>setUsername(e.target.value);
    const onChangeIndustry=(newSelectedIndustries: string[])=>setIndustry(newSelectedIndustries);
    const onChangeOccupation=(newSelectedOccupation:string[])=>setOccupation(newSelectedOccupation);
    const onChangeProgramming=(newSelectedProgramming:string[])=>setProgramming(newSelectedProgramming);
    
    const history=useHistory();
    const onClickGoHome=()=>userRegister(username,industry,occupation,programming)
    
    return( 
        <>
    <Heading as="h1" p={6} size="3xl" textAlign="center">マイページ情報登録</Heading>
    <Flex align="center" justify="center" height="200px">
        <Box bg="purple.100" w="2xl" p={4} borderRadius="md" shadow="md">
            <Heading as="h1" size="lg" textAlign="center">ユーザ名</Heading>
            <Divider my={4}/>
            <Input placeholder="ユーザ名" value={username} onChange={onChangeUsername}/>
        </Box>
    </Flex>
    <Flex align="center" justify="center" height="350px">
        <Box bg="purple.100" w="2xl" p={4} borderRadius="md" shadow="md">
            <Heading as="h1" size="lg" textAlign="center">志望業界</Heading>
            <Divider my={4}/>
            <CheckboxGroup onChange={onChangeIndustry} defaultValue={[]}>
            <Stack direction='column' spacing={6} py={4} px={10}>
                <Checkbox value='情報処理サービス業界'>情報処理サービス業界</Checkbox>
                <Checkbox value='ゲーム業界'>ゲーム業界</Checkbox>
                <Checkbox value='インターネット業界'>Web・インターネット業界</Checkbox>
                <Checkbox value='ハードウェア業界'>ハードウェア業界</Checkbox>
                <Checkbox value='ソフトウェア業界'>ソフトウェア業界</Checkbox>
            </Stack>
            </CheckboxGroup>
        </Box>  
    </Flex>
    <Flex align="center" justify="center" height="800px">
    <Box bg="purple.100" w="2xl" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">志望職種</Heading>
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

    </Box>  
    </Flex>
    <Flex align="center" justify="center" height="830px">
    <Box bg="purple.100" w="2xl" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" fontSize="lg" textAlign="center">得意なプログラミング言語</Heading>
        <Divider my={4}/>
        <CheckboxGroup onChange={onChangeProgramming} defaultValue={[]}>
        <Stack direction='column' spacing={6} py={4} px={10}>
            <Checkbox value='1'>Python</Checkbox>
            <Checkbox value='2'>JavaScript</Checkbox>
            <Checkbox value='3'>Ruby</Checkbox>
            <Checkbox value='4'>Java</Checkbox>
            <Checkbox value='5'>Swift</Checkbox>
            <Checkbox value='6'>Go</Checkbox>
            <Checkbox value='7'>C</Checkbox>
            <Checkbox value='8'>C++</Checkbox>
            <Checkbox value='9'>C#</Checkbox>
            <Checkbox value='10'>TypeScript</Checkbox>
            <Checkbox value='11'>PHP</Checkbox>
            <Checkbox value='12'>Kotlin</Checkbox>
            <Checkbox value='13'>Perl</Checkbox>
            <Checkbox value='14'>Scala</Checkbox>
            <Checkbox value='15'>VisualBasic.NET</Checkbox>
        </Stack>
        </CheckboxGroup>
    </Box>  
    </Flex>
    <Flex align="center" justify="center" height="5vh">
        <Box w="3xl">
            <Stack spacing={6} py={4} px={10}>
            <PrimaryButton disabled={ industry.length ===0 && occupation.length===0 && programming.length===0} loading={loading} onClick={onClickGoHome}>登録</PrimaryButton>
            </Stack>
        </Box>
    </Flex>
</>
    );
});