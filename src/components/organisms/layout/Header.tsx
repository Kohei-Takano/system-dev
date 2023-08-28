import { Box, Flex, Heading, IconButton, Link } from "@chakra-ui/react";
import {memo,useCallback,VFC}from"react";
import { useHistory } from "react-router-dom";
import{HamburgerIcon}from "@chakra-ui/icons";
import { useLoginUser } from "../../../hooks/useLoginUser";
import { auth } from "../../../firebase";

export const Header: VFC = memo(()=>{
    const history= useHistory();

    const onClickHome = useCallback(() => history.push("/home"),[history]);
    const onClickUserSearch = useCallback(() => history.push("/home/user_search"),[history]);
    const onClickCoDeveloper = useCallback(() => history.push("/home/co_developer"),[history]);
    const {logoutUser}=useLoginUser()
    const onClickLogout=()=>{
        auth.signOut();
        logoutUser();
        history.push("/");
    }
    return (
    <>
    <Flex as="nav" 
          bg="purple.500" 
          color="gray.50" 
          align="center" 
          justify="space-between" 
          padding={{base:3,md:5}}
    >
        <Flex align="center" as="a" mr={8} _hover={{cursor:"pointer"}} onClick={onClickHome}>
            <Heading as="h1" fontSize={{base:"md",md:"lg"}}>就活仲間</Heading>
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
        <IconButton icon={<HamburgerIcon/>}aria-label="メニューボタン" size="sm"variant="unstyled"display={{base:"block",md:"none"}}/>
    </Flex>
    </>
    );
});