import { Box, Flex, FormControl, FormLabel, Heading, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text } from "@chakra-ui/react";
import{memo,ReactNode,VFC}from"react";
import { User } from "../../../types/api/user";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { useHistory } from "react-router-dom";
import { BigButton } from "../../atoms/button/BigButton";
import { List } from "../../../types/api/list";
import { useDeleteApplication } from "../../../hooks/useDeleteApplication";
import { useApprove } from "../../../hooks/useApprove";
import { useOtherUsers } from "../../../hooks/useOtherUsers";
import { db } from "../../../firebase";
import { useSetOneUser } from "../../../hooks/useSetOneUser";


type Props={
    isOpen:boolean;
    onClose:()=>void;
    list:List|null;
};

export const ApplicationModal:VFC<Props>=memo((props)=>{
    const {list,isOpen,onClose}=props;
    const history=useHistory();
    const {approve}=useApprove();
    const {deleteApplication}=useDeleteApplication()
    const {setOneUser}=useSetOneUser()
    const {users,setUsers}=useOtherUsers();
    const onClickOk=()=>{
        approve(list?.applicationid,list?.recruitid)
        onClose();
    
    }
    const onClickNo=()=>{
        deleteApplication(list?.applicationid)
        onClose();
    }

    const onClickUser=()=>{
        if(list){
        setOneUser(list.userid)
        history.push(`/home/user_search/result/${list.userid}`)
    }}
    return(
        <Modal isOpen={isOpen} size="xs"onClose={onClose} autoFocus={false} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent pb={0}>
            <ModalCloseButton/>
            <ModalBody mx={4}>
                <Text align="center" my={6}>承認しますか？</Text>
            <Flex align="left" justify="left" height="12vh">
                
                <Box w="sm">
                    <Stack spacing={4}py={6}px={2}>
                        <PrimaryButton onClick={onClickOk}>承認</PrimaryButton>
                    </Stack>
                </Box>
                <Box w="sm">
                    <Stack spacing={4}py={6}px={2}>
                        <PrimaryButton onClick={onClickNo}>拒否</PrimaryButton>
                    </Stack>
                </Box>
            </Flex>
            <Flex align="left" justify="left" height="12vh">
                <Box w="sm">
                    <Stack spacing={4}py={6}px={2}>
                        <PrimaryButton onClick={onClickUser}>申請ユーザ詳細</PrimaryButton>
                    </Stack>
                </Box>
            </Flex>
            </ModalBody>
        </ModalContent>
    </Modal>
    );
});