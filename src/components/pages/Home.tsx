import { Box, Checkbox, CheckboxGroup, Divider, Flex, Heading, Stack, Text, Wrap, WrapItem} from "@chakra-ui/react";
import {ChangeEvent, memo,useEffect,useState,VFC}from"react";

import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { MainButton } from "../atoms/button/MainButton";
import { BigButton } from "../atoms/button/BigButton";
import { useLoginUser } from "../../hooks/useLoginUser";

export const Home: VFC = memo(()=>{
    const{login,loading}=useAuth();
    const [industry,setIndustry] =useState<string[]>([]);
    const [occupation,setOccupation]=useState<string[]>([]);
    const [programming,setProgramming]=useState<string[]>([]);
    const {loginUser}=useLoginUser();

    const onChangeIndustry=(newSelectedIndustries: string[])=>setIndustry(newSelectedIndustries);
    const onChangeOccupation=(newSelectedOccupation:string[])=>setOccupation(newSelectedOccupation);
    const onChangeProgramming=(newSelectedProgramming:string[])=>setProgramming(newSelectedProgramming);
    
    const history=useHistory();
    const onClickGoUserSearch=()=>history.push("/home/user_search")
    const onClickGoCoDeveloper=()=>history.push("/home/co_developer")
    const onClickGoFriendList=()=>history.push("/home/friend_list")
    const onClickGoUserRegister=()=>history.push("/home/user_info")
    useEffect(() => {
        // ローカルストレージから情報を取得
        const storedInfo = localStorage.getItem("loggedInUser");
    
        if (!storedInfo) {
          history.push("/"); // ログインページへ遷移
        }
      }, [history]);
    return( 
        <>
        <Heading as="h1" p={6} size="3xl" textAlign="center">ホーム</Heading>
        <Wrap spacing="30px" p={{base:4,md:10}} justify="center">
            <WrapItem>
                <Stack textAlign="center">
                    <BigButton  loading={loading} onClick={onClickGoUserSearch}>就活仲間を検索</BigButton>
                </Stack>
            </WrapItem>
            <WrapItem>
                <Stack textAlign="center">
                    <BigButton loading={loading} onClick={onClickGoCoDeveloper}>共同開発者を探す</BigButton>
                </Stack>
            </WrapItem>
            <WrapItem>
                <Stack textAlign="center">
                    <BigButton loading={loading} onClick={onClickGoFriendList}>友だちリスト</BigButton>
                </Stack>
            </WrapItem>
        </Wrap>
        <Heading as="h1" p={6} size="xl" textAlign="center">登録情報</Heading>
        <Flex align="center" justify="center" height="5vh">
            <Box key={loginUser?.uid}>
                <Heading as="h2" p={6} size="md" textAlign="center">ユーザ名：{loginUser?.displayName}</Heading>
            </Box>
        </Flex>
        <Flex align="center" justify="center" height="30vh">
            <Box w="sm">
            <Stack spacing={6} py={4} px={10}>
                <MainButton loading={loading} onClick={onClickGoUserRegister}>登録情報変更</MainButton>
            </Stack>
        </Box>
    </Flex>
       
</>
    );
});