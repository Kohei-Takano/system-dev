import { Box, Center, Flex, Heading, Spinner, Stack, Text, Wrap, WrapItem } from "@chakra-ui/react";
import {memo,useEffect,VFC}from"react";
import { UserCard } from "../organisms/user/UserCard";
import { useAllUsers } from "../../hooks/useAllUsers";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { MainButton } from "../atoms/button/MainButton";
import { useRecruits } from "../../hooks/useRecruits";
import { useOtherUsers } from "../../hooks/useOtherUsers";
import { User } from "../../types/api/user";
export const RecruitmentDetail: VFC = memo(()=>{
    const {getUsers,loading}=useAllUsers();
    const {recruitId}=useParams<{ recruitId: string }>();
    const {recruits}=useRecruits();
    const {users}=useOtherUsers();
    useEffect(()=>getUsers(),[]);
    const history=useHistory();
    const onClickUserCard=()=>history.push("/home/user_search/result/user_detail")
    const onClickApplication=()=>history.push(`/home/co_developer/search/result/${recruitId}/application`)
    const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
    useEffect(() => {
        // ローカルストレージから情報を取得
        const storedInfo = localStorage.getItem("loggedInUser");
    
        if (!storedInfo) {
          history.push("/"); // ログインページへ遷移
        }
      }, [history]);
      const findRecruit=recruits.find((recruit)=>{
        return recruit.recruitid===recruitId
      })
      const newPeople:string[]=[];
      const newThing:string[]=[];
      const newTime:string[]=[];
      
      if(findRecruit){
    const changePeople:string[]=findRecruit.people.map((onePeople:string)=>{
        switch(onePeople){
            case "1":
            return "2～4人";
            case "2":
            return "5～7人";
            case "3":
            return "8～10人";
            case "4":
            return "11～13人";
            case "5":
            return "14～16人";
            case "6":
            return "17人以上";
            default:
            return ""; // もし想定外の値が入っていた場合のデフォルト処理
        }
    })
    const changeThing:string[]=findRecruit.thing.map((oneThing:string)=>{
        switch(oneThing){
            case "1":
            return "Webサービス";
            case "2":
            return "ゲーム";
            case "3":
            return "アート";
            case "4":
            return "サウンド";
            case "5":
            return "その他";
            default:
            return ""; // もし想定外の値が入っていた場合のデフォルト処理
        }
    })
    const changeTime:string[]=findRecruit.time.map((oneTime:string)=>{
        switch(oneTime){
            case "1":
            return "3カ月以下";
            case "2":
            return "4カ月";
            case "3":
            return "5カ月";
            case "4":
            return "6カ月";
            case "5":
            return "7カ月";
            case "6":
            return "8カ月";
            case "7":
            return "9カ月";
            case "8":
            return "10カ月";
            case "9":
            return "11カ月";
            case "10":
            return "1年";
            case "11":
            return "1年以上";
            default:
            return ""; // もし想定外の値が入っていた場合のデフォルト処理
        }
    })
    changePeople.forEach((element)=>{
        newPeople.push(element)
    });
    changeThing.forEach((element)=>{
        newThing.push(element)
    })
    changeTime.forEach((element)=>{
        newTime.push(element)
    })
}
const recruitPerson=users.find((user)=>{
    return findRecruit?.userid===user.userid
})
    return (
        <>
        <Heading as="h1" p={6} size="3xl" textAlign="center">募集詳細</Heading>
        <Heading as="h1" p={6} size="xl" textAlign="center">募集タイトル</Heading>
        <Flex align="center" justify="center" height="120px">
            <Box bg="white" w="2xl" p={4} borderRadius="md" shadow="md">
                <Stack spacing={6} py={4} px={10}>
                    <Text>{findRecruit?.recruitTitle}</Text>
                </Stack>
            </Box>
        </Flex>
        <Heading as="h1" p={6} size="xl" textAlign="center">募集メッセージ</Heading>
        <Flex align="center" justify="center" height="180px">
            <Box bg="white" w="2xl" p={4} borderRadius="md" shadow="md">
                <Stack spacing={6} py={4} px={10}>
                    <Text>{findRecruit?.text}</Text>
                </Stack>
            </Box>
        </Flex>
        <Heading as="h1" p={6} size="xl" textAlign="center">制作物</Heading>
        <Flex align="center" justify="center" height="120px">
            <Box bg="white" w="2xl" p={4} borderRadius="md" shadow="md">
                <Stack spacing={6} py={4} px={10}>
                    <Text>{newThing.join(", ")}</Text>
                </Stack>
            </Box>
        </Flex>
        <Heading as="h1" p={6} size="xl" textAlign="center">募集人数</Heading>
        <Flex align="center" justify="center" height="120px">
            <Box bg="white" w="2xl" p={4} borderRadius="md" shadow="md">
                <Stack spacing={6} py={4} px={10}>
                    <Text>{newPeople.join(", ")}</Text>
                </Stack>
            </Box>
        </Flex>
        <Heading as="h1" p={6} size="xl" textAlign="center">予想制作期間</Heading>
        <Flex align="center" justify="center" height="120px">
            <Box bg="white" w="2xl" p={4} borderRadius="md" shadow="md">
                <Stack spacing={6} py={4} px={10}>
                    <Text>{newTime.join(", ")}</Text>
                </Stack>
            </Box>
        </Flex>
        <Heading as="h1" p={6} size="xl" textAlign="center">募集者</Heading>
        <Flex align="center" justify="center" height="120px">
            <Box bg="white" w="2xl" p={4} borderRadius="md" shadow="md">
                <Stack spacing={6} py={4} px={10}>
                    <Text>{recruitPerson?.username}</Text>
                </Stack>
            </Box>
        </Flex>
        <Heading as="h1" p={6} size="xl" textAlign="center">現在参加中のユーザ</Heading>
        {loading ? (
        <Center h="100vh">
            <Spinner/>
        </Center>
        ):(
    <Wrap p={{base:4,md:10}} justify="center">
        {users.map((user)=>(
            <WrapItem key={user.userid} >
                <UserCard 
                    userid={user.userid}
                    imageUrl="https://source.unsplash.com/random" 
                    userName={user.username} 
                    industry={user.industry}
                    onClick={onClickUserCard}
                />
            </WrapItem>
        ))}
    </Wrap>
    )}
    <Flex align="center" justify="center" height="30vh">
        <Box w="sm">
            <Stack spacing={6} py={4} px={10}>
                <MainButton loading={loading} onClick={onClickApplication}>参加申請</MainButton>
            </Stack>
        </Box>
    </Flex>
        </>
    )
});