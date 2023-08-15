import { Box, FormControl, FormLabel, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Text } from "@chakra-ui/react";
import{memo,ReactNode,VFC}from"react";
import { User } from "../../../types/api/user";

type Props={
    isOpen:boolean;
    onClose:()=>void;
    user:User|null;
};

export const UserDetailModal:VFC<Props>=memo((props)=>{
    const {user,isOpen,onClose}=props;
    return(
        <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent pb={6}>
            <ModalHeader>ユーザ詳細</ModalHeader>
            <ModalCloseButton/>
            <ModalBody mx={4}>
                <Stack spacing={4}>
                    <FormControl>
                        <FormLabel>名前</FormLabel>
                        <Input value={user?.username} isReadOnly/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>フルネーム</FormLabel>
                        <Input value={user?.name} isReadOnly/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>学年</FormLabel>
                        <Input value={user?.email} isReadOnly/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>価値観</FormLabel>
                        <Input value={user?.phone} isReadOnly/>
                    </FormControl>
                </Stack>
            </ModalBody>
        </ModalContent>
    </Modal>
    );
});