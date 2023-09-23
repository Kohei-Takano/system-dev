import { Box, Center, Flex, Heading, Spinner, Stack, Text, Wrap, WrapItem, useDisclosure } from "@chakra-ui/react";
import {memo,useCallback,useEffect,VFC}from"react";
import { UserCard } from "../organisms/user/UserCard";
import { useAllUsers } from "../../hooks/useAllUsers";
import { useHistory } from "react-router-dom";
import { MainButton } from "../atoms/button/MainButton";
import { UserDetailModal } from "../organisms/user/UserDetailModal";
import { useSelectUser } from "../../hooks/useSelectUser";
export const ContentRecruitment: VFC = memo(()=>{
    const {getUsers,users,loading}=useAllUsers();
    const { isOpen,onOpen,onClose}=useDisclosure();
    const {onSelectUser,selectedUser}=useSelectUser();
    useEffect(()=>getUsers(),[]);
    const history=useHistory();
    const onClickUserCard=()=>history.push("/home/user_search/result/user_detail")
        //history.push("/home/user_search/result/user_detail")
    const onClickApplication=()=>history.push("/home/co_developer/search/result/detail/application")
    useEffect(() => {
        // ローカルストレージから情報を取得
        const storedInfo = localStorage.getItem("loggedInUser");
    
        if (!storedInfo) {
          history.push("/"); // ログインページへ遷移
        }
      }, [history]);
    return (
        <>
        <Heading as="h1" p={6} size="3xl" textAlign="center">募集詳細</Heading>
        <Heading as="h1" p={6} size="xl" textAlign="center">募集内容</Heading>
        <Flex align="center" justify="center" height="120px">
            <Box bg="white" w="2xl" p={4} borderRadius="md" shadow="md">
                <Stack spacing={6} py={4} px={10}>
                    <Text>来てください</Text>
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
                    //imageUrl="https://source.unsplash.com/random" 
                    userName={user.username} 
                    programming={user.programming}
                    onClick={onClickUserCard}
                />
            </WrapItem>
        ))}
    </Wrap>
    )}
        </>
    )
});