import { Center, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner, Stack, Wrap, WrapItem, useDisclosure } from "@chakra-ui/react";
import {memo,useCallback,useEffect,VFC}from"react";
import { UserCard } from "../organisms/user/UserCard";
import { useAllUsers } from "../../hooks/useAllUsers";
import { UserDetailModal } from "../organisms/user/UserDetailModal";
import { useSelectUser } from "../../hooks/useSelectUser";
import { useHistory } from "react-router-dom";
export const FriendsList: VFC = memo(()=>{
    const { isOpen,onOpen,onClose}=useDisclosure();
    const {getUsers,users,loading}=useAllUsers();

    useEffect(()=>getUsers(),[]);

    const history=useHistory();
    const onClickUserCard=()=>history.push("/home/user_search/result/user_detail")
    useEffect(() => {
        // ローカルストレージから情報を取得
        const storedInfo = localStorage.getItem("loggedInUser");
    
        if (!storedInfo) {
          history.push("/"); // ログインページへ遷移
        }
      }, [history]);
    return(
    <>
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
                    onClick={onClickUserCard}
                />
            </WrapItem>
        ))}
    </Wrap>
    )}
    </>
    )
});