import { Box, Center, Flex, FormControl, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner, Stack, Wrap, WrapItem, useDisclosure } from "@chakra-ui/react";
import {memo,useCallback,useEffect,VFC}from"react";
import { UserCard } from "../organisms/user/UserCard";
import { useAllUsers } from "../../hooks/useAllUsers";
import { UserDetailModal } from "../organisms/user/UserDetailModal";
import { useSelectUser } from "../../hooks/useSelectUser";
import { MainButton } from "../atoms/button/MainButton";
import { useHistory } from "react-router-dom";
export const RecruitmentsSearchResult: VFC = memo(()=>{
    const { isOpen,onOpen,onClose}=useDisclosure();
    const {getUsers,users,loading}=useAllUsers();
    const {onSelectUser,selectedUser}=useSelectUser();

    useEffect(()=>getUsers(),[]);

    const onClickUser = useCallback((id:number) => {
        onSelectUser({id,users,onOpen});
        },[users,onSelectUser,onOpen]);

        const history=useHistory();
        const onClickUserSearch=()=>history.push("/home/co_developer/search")
        const onClickRecruitmentDetail=()=>history.push("/home/co_developer/search/result/detail")
        useEffect(() => {
            // ローカルストレージから情報を取得
            const storedInfo = localStorage.getItem("loggedInUser");
        
            if (!storedInfo) {
              history.push("/"); // ログインページへ遷移
            }
          }, [history]);
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
            <WrapItem key={user.id} >
                <UserCard 
                    id={user.id}
                    imageUrl="https://source.unsplash.com/random" 
                    userName={user.username} 
                    fullName={user.name}
                    onClick={onClickRecruitmentDetail}
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