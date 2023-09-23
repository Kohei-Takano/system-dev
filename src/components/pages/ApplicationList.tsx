import { Box, Center, Flex, Heading, Spinner, Stack, Wrap, WrapItem, useDisclosure } from "@chakra-ui/react";
import {memo,useCallback,useEffect,VFC}from"react";
import { MainButton } from "../atoms/button/MainButton";
import { Link, useHistory, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { UserCard } from "../organisms/user/UserCard";
import { useAllUsers } from "../../hooks/useAllUsers";
import { Application } from "../organisms/user/Application";
import { useSelectUser } from "../../hooks/useSelectUser";
import { UserDetailModal } from "../organisms/user/UserDetailModal";
import { ApplicationModal } from "../organisms/user/ApplicationModal";
import { useApplications } from "../../hooks/useApplications";
import { RecruitCard } from "../organisms/recruit/RecruitCard";
import { ApplicationCard } from "../organisms/recruit/ApplicationCard";
export const ApplicationList: VFC = memo(()=>{
    const { isOpen,onOpen,onClose}=useDisclosure();
    //const {getUsers,users,loading}=useAllUsers();
    const {onSelectUser,selectedUser}=useSelectUser();
    const {list,loading}=useApplications()
    const {recruitId}=useParams<{ recruitId: string }>();
    //useEffect(()=>getUsers(),[]);
    const history=useHistory();

    const onClickApplication = useCallback((id:string) => {
        onSelectUser({id,list,onOpen});
        },[list,onSelectUser,onOpen]);

    const onClickTitle=()=>history.push("/home/co_developer/recruitmentid")
    const onClickList=()=>history.push("/home/co_developer/recruitmentid/application_list")
    
    useEffect(() => {
        // ローカルストレージから情報を取得
        const storedInfo = localStorage.getItem("loggedInUser");
    
        if (!storedInfo) {
          history.push("/"); // ログインページへ遷移
        }
      }, [history]);
    return (
        <>
    <Heading as="h1" p={6} size="3xl" textAlign="center">参加申請一覧</Heading>
    <Box position="relative"minHeight={`calc(100vh - 290px)`}>
    {loading ? (
        <Center h="100vh">
            <Spinner/>
        </Center>
        ):(
    <Wrap p={{base:4,md:10}} justify="center">
        {list.map((oneList)=>(
            <WrapItem key={oneList.applicationid} >
                <ApplicationCard
                    applicationid={oneList.applicationid}
                    text={oneList.text} 
                    onClick={onClickApplication}
                />
            </WrapItem>
        ))}
    </Wrap>
    
    )}</Box>
    <ApplicationModal list={selectedUser}isOpen={isOpen} onClose={onClose}/>
    </>
    )
});
