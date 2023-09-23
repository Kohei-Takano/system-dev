import { Box, Button, Drawer, DrawerBody, DrawerContent, DrawerOverlay, Flex, Heading, IconButton, Link, useDisclosure } from "@chakra-ui/react";
import {memo,useCallback,VFC}from"react";
import { useHistory } from "react-router-dom";
import{HamburgerIcon}from "@chakra-ui/icons";
import { useLoginUser } from "../../../hooks/useLoginUser";
import { auth } from "../../../firebase";
import { useRecruitTeam } from "../../../hooks/useRecruitTeam";

export const Header: VFC = memo(()=>{
    const {isOpen,onOpen,onClose}=useDisclosure()
    const history= useHistory();

    const {recruitTeam}=useRecruitTeam();
    const onClickHome = useCallback(() => history.push("/home"),[history]);
    const onClickUserSearch = useCallback(() => history.push("/home/user_search"),[history]);
    const onClickCoDeveloper = recruitTeam//useCallback(() => history.push("/home/co_developer"),[history]);
    const {logoutUser}=useLoginUser()
    const onClickLogout=()=>{
        auth.signOut();
        logoutUser();
        history.push("/");
    }
    return (
    <>
    <Flex as="nav" 
          bgGradient="linear(to-r, teal.500, green.500)" 
          color="gray.50" 
          align="center" 
          justify="space-between" 
          padding={{base:3,md:5}}
    >
        <Flex align="center" as="a" mr={8} _hover={{cursor:"pointer"}} onClick={onClickHome}>
            <Heading as="h1" fontSize={{base:"md",md:"lg"}}>Collaboration Park</Heading>
        </Flex>
        <Flex align="center" fontSize="sm" flexGrow={2} display={{base:"none", md:"flex"}}>
            <Box pr={4}>
                <Link onClick={onClickUserSearch}>就活仲間を探す</Link>
            </Box>
            <Box pr={4}>
                <Link onClick={onClickCoDeveloper}>共同開発者を探す</Link>
            </Box>
            <Box>
                <Link onClick={onClickLogout}>ログアウト</Link>
            </Box>
        </Flex>
        <IconButton icon={<HamburgerIcon/>}aria-label="メニューボタン" size="sm"variant="unstyled"display={{base:"block",md:"none"}}onClick={onOpen}/>
    </Flex>
    <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
            <DrawerContent>
                <DrawerBody p={0} bg="gray.100">
                    <Button w="100%" onClick={onClickHome}>HOME</Button>
                    <Button w="100%" onClick={onClickUserSearch}>就活仲間を探す</Button>
                    <Button w="100%" onClick={onClickCoDeveloper}>共同開発者を探す</Button>
                    <Button w="100%" onClick={onClickLogout}>ログアウト</Button>
                </DrawerBody>
            </DrawerContent>
        </DrawerOverlay>
    </Drawer>
    </>
    );
});