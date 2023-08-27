import { Box, Center, Flex, Spinner, Stack, Wrap, WrapItem, useDisclosure } from "@chakra-ui/react";
import {memo,useCallback,useEffect,VFC}from"react";
import { MainButton } from "../atoms/button/MainButton";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { UserCard } from "../organisms/user/UserCard";
import { useAllUsers } from "../../hooks/useAllUsers";
import { Application } from "../organisms/user/Application";
import { useSelectUser } from "../../hooks/useSelectUser";
import { UserDetailModal } from "../organisms/user/UserDetailModal";
import { ApplicationModal } from "../organisms/user/ApplicationModal";
export const ApplicationList: VFC = memo(()=>{
    const { isOpen,onOpen,onClose}=useDisclosure();
    const {getUsers,users,loading}=useAllUsers();
    const {onSelectUser,selectedUser}=useSelectUser();
    useEffect(()=>getUsers(),[]);
    const history=useHistory();

    const onClickApplication = useCallback((id:number) => {
        onSelectUser({id,users,onOpen});
        },[users,onSelectUser,onOpen]);

    const onClickTitle=()=>history.push("/home/co_developer/recruitmentid")
    const onClickList=()=>history.push("/home/co_developer/recruitmentid/application_list")
    return (
        <>
    <Flex align="left" justify="left" >
        <Box w="sm">
            <Stack spacing={6} py={4} px={10}>
                <MainButton loading={loading} onClick={onClickTitle}>募集タイトル</MainButton>
            </Stack>
        </Box>
        <Box w="sm">
            <Stack spacing={6} py={4} px={10}>
                <MainButton loading={loading} onClick={onClickList}>参加申請一覧</MainButton>
            </Stack>
        </Box>
    </Flex>
    {loading ? (
        <Center h="100vh">
            <Spinner/>
        </Center>
        ):(
    <Wrap p={{base:4,md:10}} justify="center">
        {users.map((user)=>(
            <WrapItem key={user.id} >
                <Application
                    id={user.id}
                    userName={user.username} 
                    fullName={user.name}
                    onClick={onClickApplication}
                />
            </WrapItem>
        ))}
    </Wrap>
    
    )}
    <ApplicationModal user={selectedUser}isOpen={isOpen} onClose={onClose}/>
    </>
    )
});
