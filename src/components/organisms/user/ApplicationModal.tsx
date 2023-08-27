import { Box, Flex, FormControl, FormLabel, Heading, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text } from "@chakra-ui/react";
import{memo,ReactNode,VFC}from"react";
import { User } from "../../../types/api/user";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { useHistory } from "react-router-dom";
import { BigButton } from "../../atoms/button/BigButton";

type Props={
    isOpen:boolean;
    onClose:()=>void;
    user:User|null;
};

export const ApplicationModal:VFC<Props>=memo((props)=>{
    const {user,isOpen,onClose}=props;
    const history=useHistory();
    const onClickOk=()=>onClose();
    const onClickNo=()=>onClose();

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
            </ModalBody>
        </ModalContent>
    </Modal>
    );
});