import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import {memo,useEffect,VFC}from"react";
import { MainButton } from "../atoms/button/MainButton";
import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useOtherUsers } from "../../hooks/useOtherUsers";
import { useUserMessages } from "../../hooks/useUsersMessages";
import { useFriendMessages } from "../../hooks/useFriendMessages";
export const UserDetail: VFC = memo(()=>{
    const{login,loading}=useAuth();
    const {users}=useOtherUsers();
    const {userId}=useParams<{ userId: string }>();
    const history=useHistory();
    const {userMessages}=useUserMessages()
   
    const onClickGoUserMessages=()=>history.push(`/home/user_search/result/${userId}/messages`)
    //userMessages(userId)
    useEffect(() => {
        // ローカルストレージから情報を取得
        const storedInfo = localStorage.getItem("loggedInUser");
    
        if (!storedInfo) {
          history.push("/"); // ログインページへ遷移
        }
      }, [history]);
      const findUser=users.find((user)=>{
        return user.userid===userId
      })
      const newIndustry:string[]=[];
      const newOccupation:string[]=[];
      const newProgramming:string[]=[];
      if(findUser){
      
    const changeOccupation:string[]=findUser.occupation.map((oneOccupation:string)=>{
        switch(oneOccupation){
            case "1":
            return "システムエンジニア";
            case "2":
            return "プログラマー";
            case "3":
            return "ネットワークエンジニア";
            case "4":
            return "ハードウェアエンジニア";
            case "5":
            return "組み込みエンジニア";
            case "6":
            return "ITコンサルタント";
            case "7":
            return "セールスエンジニア";
            case "8":
            return "Webデザイナー";
            case "9":
            return "ゲームプランナー";
            case "10":
            return "ゲームプログラマー（ゲーム開発）";
            case "11":
            return "ゲームプログラマー（ゲーム開発支援）";
            case "12":
            return "ゲームプログラマー（バックエンドプログラマー）";
            case "13":
            return "ゲームデザイナー";
            default:
            return ""; // もし想定外の値が入っていた場合のデフォルト処理
        }
    })
    const changeProgramming:string[]=findUser.programming.map((oneProgramming:string)=>{
        switch(oneProgramming){
            case "1":
            return "Python";
            case "2":
            return "JavaScript";
            case "3":
            return "Ruby";
            case "4":
            return "Java";
            case "5":
            return "Swift";
            case "6":
            return "Go";
            case "7":
            return "C";
            case "8":
            return "C++";
            case "9":
            return "C#";
            case "10":
            return "TypeScript";
            case "11":
            return "PHP";
            case "12":
            return "Kotlin";
            case "13":
            return "Perl";
            case "14":
            return "Scala";
            case "15":
            return "VisualBasic.NET";
            default:
            return ""; // もし想定外の値が入っていた場合のデフォルト処理
        }
    })
    findUser.industry.forEach((element)=>{
        newIndustry.push(element)
    });
    changeOccupation.forEach((element)=>{
        newOccupation.push(element)
    })
    findUser.programming.forEach((element)=>{
        newProgramming.push(element)
    })
}
    return (
    <>
    <Heading as="h1" p={6} size="xl" textAlign="center">ユーザ情報</Heading>
    <Flex align="center" justify="center" height="200px">
            <Box bg="white" w="4xl" p={4} borderRadius="md" shadow="md">
                <Heading as="h2" p={6} size="md" textAlign="center">ユーザ名：{findUser?.username}</Heading>
            </Box>
        </Flex>
        <Flex align="center" justify="center" height="70px">
            <Box bg="white" w="4xl" p={4} borderRadius="md" shadow="md">
            <Heading as="h2" p={6} size="md" textAlign="center">志望業界・現在の業界：{newIndustry.join(", ")}</Heading>
            </Box>
        </Flex>
        <Flex align="center" justify="center" height="200px">
            <Box bg="white" w="4xl" p={4} borderRadius="md" shadow="md">
            <Heading as="h2" p={6} size="md" textAlign="center">志望職種・現在の職種：{newOccupation.join(", ")}</Heading>
            </Box>
        </Flex>
        <Flex align="center" justify="center" height="70px">
            <Box bg="white" w="4xl" p={4} borderRadius="md" shadow="md">
            <Heading as="h2" p={6} size="md" textAlign="center">得意なプログラミング言語：{newProgramming.join(", ")}</Heading>
            </Box>
        </Flex>
        <Flex align="center" justify="center" height="200px">
            <Box bg="white" w="4xl" p={4} borderRadius="md" shadow="md">
            <Heading as="h2" p={6} size="md" textAlign="center">募集に参加した回数：{findUser?.participationNumber}</Heading>
            </Box>
        </Flex>
        <Flex align="center" justify="center" height="140px">
            <Box bg="white" w="4xl" p={4} borderRadius="md" shadow="md">
            <Heading as="h2" p={6} size="md" textAlign="center">記述したコードのURL：{findUser?.url1}</Heading>
            <Heading as="h2" p={6} size="md" textAlign="center">制作物のURL：{findUser?.url2}</Heading>
            </Box>
        </Flex>
    <Flex align="center" justify="center" height="30vh">
        <Box w="sm">
            <Stack spacing={6} py={4} px={10}>
                <MainButton loading={loading} onClick={onClickGoUserMessages}>メッセージを送る</MainButton>
            </Stack>
        </Box>
    </Flex>
    </>
    )
});