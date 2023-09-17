import { Box, Checkbox, CheckboxGroup, Divider, Flex, Heading, Stack, Text, Wrap, WrapItem} from "@chakra-ui/react";
import {ChangeEvent, memo,useEffect,useState,VFC}from"react";

import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { MainButton } from "../atoms/button/MainButton";
import { BigButton } from "../atoms/button/BigButton";
import { useLoginUser } from "../../hooks/useLoginUser";
import { doc, getDoc,query, where,collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useUserData } from "../../hooks/useUserData";
import { useRecruitTeam } from "../../hooks/useRecruitTeam";
import { useGoFriends } from "../../hooks/useGoFriends";

export const Home: VFC = memo(()=>{
    const{login,loading}=useAuth();
    const [userData, setUserData] = useState<{
        username: string;
        industry: string[];
        processedOccupation: string[];
        processedProgramming: string[];
      } | null>(null);

      const {recruitTeam}=useRecruitTeam();
      const {goFriends}=useGoFriends()
      const history=useHistory();

      useEffect(() => {
        // ローカルストレージから情報を取得
        const storedInfo = localStorage.getItem("loggedInUser");
    
        if (!storedInfo) {
          history.push("/"); // ログインページへ遷移
        }
      }, [history]);
    useEffect(() => {
        const FetchUserData = async () => {
            const userData = await useUserData();
            setUserData(userData);
        }
        FetchUserData();
      }, []);
      
    const onClickGoUserSearch=()=>history.push("/home/user_search")
    const onClickGoCoDeveloper=()=>recruitTeam()
    //history.push("/home/co_developer")
    const onClickGoFriendList=()=>goFriends()
    //history.push("/home/friend_list")
    const onClickGoUserRegister=()=>history.push("/home/user_info")
    
    return( 
        <>
        {userData === null?
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
                        <BigButton loading={loading} onClick={onClickGoFriendList}>フレンドリスト</BigButton>
                    </Stack>
                </WrapItem>
            </Wrap>
            <Flex align="center" justify="center" height="30vh">
            <Box w="sm">
            <Stack spacing={6} py={4} px={10}>
                <MainButton loading={loading} onClick={onClickGoUserRegister}>登録情報変更</MainButton>
            </Stack>
        </Box>
    </Flex>
    </>:
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
                    <BigButton loading={loading} onClick={onClickGoFriendList}>フレンドリスト</BigButton>
                </Stack>
            </WrapItem>
        </Wrap>
        <Heading as="h1" p={6} size="xl" textAlign="center">登録情報</Heading>
        <Flex align="center" justify="center" height="200px">
            <Box bg="white" w="2xl" p={4} borderRadius="md" shadow="md">
                <Heading as="h2" p={6} size="md" textAlign="center">ユーザ名：{userData?.username}</Heading>
            </Box>
        </Flex>
        <Flex align="center" justify="center" height="80px">
            <Box bg="white" w="2xl" p={4} borderRadius="md" shadow="md">
            <Heading as="h2" p={6} size="md" textAlign="center">志望業界：{userData?.industry.join(", ")}</Heading>
            </Box>
        </Flex>
        <Flex align="center" justify="center" height="200px">
            <Box bg="white" w="2xl" p={4} borderRadius="md" shadow="md">
            <Heading as="h2" p={6} size="md" textAlign="center">志望職種：{userData?.processedOccupation.join(", ")}</Heading>
            </Box>
        </Flex>
        <Flex align="center" justify="center" height="80px">
            <Box bg="white" w="2xl" p={4} borderRadius="md" shadow="md">
            <Heading as="h2" p={6} size="md" textAlign="center">得意なプログラミング言語：{userData?.processedProgramming.join(", ")}</Heading>
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
}
</>
    );
});