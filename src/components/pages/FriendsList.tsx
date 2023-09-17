import { Center, FormControl, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner, Stack, Wrap, WrapItem, useDisclosure } from "@chakra-ui/react";
import {memo,useCallback,useEffect,VFC}from"react";
import { UserCard } from "../organisms/user/UserCard";
import { useAllUsers } from "../../hooks/useAllUsers";
import { UserDetailModal } from "../organisms/user/UserDetailModal";
import { useSelectUser } from "../../hooks/useSelectUser";
import { useHistory } from "react-router-dom";
import { useFriends } from "../../hooks/useFriends";
import { useOtherUsers } from "../../hooks/useOtherUsers";
export const FriendsList: VFC = memo(()=>{
    const { isOpen,onOpen,onClose}=useDisclosure();
    const {loading}=useAllUsers();
    const {users}=useOtherUsers();
    //useEffect(()=>getUsers(),[]);

    const history=useHistory();
    const onClickUserCard=(userId:string)=>history.push(`/home/user_search/result/${userId}`)
    useEffect(() => {
        // ローカルストレージから情報を取得
        const storedInfo = localStorage.getItem("loggedInUser");
    
        if (!storedInfo) {
          history.push("/"); // ログインページへ遷移
        }
      }, [history]);
    return(
    <>
    <Heading as="h1" p={6} size="3xl" textAlign="center">フレンドリスト</Heading>
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
    </>
    )
});