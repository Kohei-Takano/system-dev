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
        programming: string[];
        participationNumber:number,
        url1:string;
        url2:string;
      } | null|undefined>(null);

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
            try{
            const userData = await useUserData();
            console.log(userData)
            setUserData(userData);
            }catch (error) {
                console.error("データの取得エラー:", error);
              }
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
        <Heading as="h1" p={6} size="3xl" textAlign="center">ホーム</Heading>
            <Wrap spacing="30px" p={{base:4,md:10}} justify="center">
                <WrapItem>
                    <Stack textAlign="center">
                        <BigButton  loading={loading} onClick={onClickGoUserSearch}>ユーザ検索</BigButton>
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
        {userData === null?(
        <p>Loading...</p>
        ):(
        <>
        <Heading as="h1" p={6} size="xl" textAlign="center">登録情報</Heading>
        <Flex align="center" justify="center" height="200px">
            <Box bg="white" w="4xl" p={4} borderRadius="md" shadow="md">
                <Heading as="h2" p={6} size="md" textAlign="center">ユーザ名：{userData?.username}</Heading>
            </Box>
        </Flex>
        <Flex align="center" justify="center" height="70px">
            <Box bg="white" w="4xl" p={4} borderRadius="md" shadow="md">
            <Heading as="h2" p={6} size="md" textAlign="center">志望業界・現在の業界：{userData?.industry.join(", ")}</Heading>
            </Box>
        </Flex>
        <Flex align="center" justify="center" height="200px">
            <Box bg="white" w="4xl" p={4} borderRadius="md" shadow="md">
            <Heading as="h2" p={6} size="md" textAlign="center">志望職種・現在の職種：{userData?.processedOccupation.join(", ")}</Heading>
            </Box>
        </Flex>
        <Flex align="center" justify="center" height="70px">
            <Box bg="white" w="4xl" p={4} borderRadius="md" shadow="md">
            <Heading as="h2" p={6} size="md" textAlign="center">得意なプログラミング言語：{userData?.programming.join(", ")}</Heading>
            </Box>
        </Flex>
        <Flex align="center" justify="center" height="200px">
            <Box bg="white" w="4xl" p={4} borderRadius="md" shadow="md">
            <Heading as="h2" p={6} size="md" textAlign="center">募集に参加した回数：{userData?.participationNumber}</Heading>
            </Box>
        </Flex>
        <Flex align="center" justify="center" height="140px" mb={12}>
            <Box bg="white" w="4xl" p={4} borderRadius="md" shadow="md">
            <Heading as="h2" p={6} size="md" textAlign="center">記述したコードのURL：{userData?.url1}</Heading>
            <Heading as="h2" p={6} size="md" textAlign="center">制作物のURL：{userData?.url2}</Heading>
            </Box>
        </Flex>
    </>
    )
}
</>
    );
});