import { Box, Center, Flex,  Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner, Stack, Wrap, WrapItem, useDisclosure } from "@chakra-ui/react";
import {memo,useCallback,useEffect,VFC}from"react";
import { UserCard } from "../organisms/user/UserCard";
import { useAllUsers } from "../../hooks/useAllUsers";
import { UserDetailModal } from "../organisms/user/UserDetailModal";
import { useSelectUser } from "../../hooks/useSelectUser";
import { MainButton } from "../atoms/button/MainButton";
import { useHistory } from "react-router-dom";
import { useUsernameSearch } from "../../hooks/useUsernameSearch";
import { useOtherUsers } from "../../hooks/useOtherUsers";
import { useAuth } from "../../hooks/useAuth";
import { User } from "../../types/api/user";
export const UserSearchResult: VFC = memo(()=>{
    const{loading}=useAuth();
    const { isOpen,onOpen,onClose}=useDisclosure();
    //const {getUsers,users,loading}=useAllUsers();
    const {onSelectUser,selectedUser}=useSelectUser();
    const {users}=useOtherUsers();
    useEffect(()=>{
    users.forEach((user) => {
        console.log("Before mapping:", user.industry);
        user.industry = user.industry.map((oneIndustry:string) => {
               console.log("Inside mapping:", oneIndustry);
            switch(oneIndustry){
                case '1':
                return "情報処理サービス業界";
                case '2':
                return "ゲーム業界";
                case '3':
                return "Web・インターネット業界";
                case '4':
                return "ハードウェア業界";
                case '5':
                return "ソフトウェア業界";
                default:
                return ""; // もし想定外の値が入っていた場合のデフォルト処理
            }}
)});},[]
)


    //useEffect(()=>getUsers(),[]);

    

        const history=useHistory();
        const onClickUserSearch=()=>history.push("/home/user_search")
        useEffect(() => {
            // ローカルストレージから情報を取得
            const storedInfo = localStorage.getItem("loggedInUser");
        
            if (!storedInfo) {
              history.push("/"); // ログインページへ遷移
            }
          }, [history]);
          const onClickUser =(userId:string)=> history.push(`/home/user_search/result/${userId}`)
        //useCallback((id:string) => {
        //onSelectUser({id,users,onOpen});
        //},[users,onSelectUser,onOpen]);
    return(
    <>
    <Heading as="h1" p={6} fontSize="3xl" textAlign="center">検索結果</Heading>
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
                    onClick={onClickUser}
                />
            </WrapItem>
        ))}
    </Wrap>
        )}
    <Flex align="center" justify="center" height="30vh">
        <Box w="sm">
            <Stack spacing={6} py={4} px={10}>
                <MainButton loading={loading} onClick={onClickUserSearch}>他の条件で検索</MainButton>
            </Stack>
        </Box>
    </Flex>
    </>
    )
});