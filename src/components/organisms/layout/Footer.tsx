import { Box, Button, Center, Drawer, DrawerBody, DrawerContent, DrawerOverlay, Flex, Heading, IconButton, Link, Stack, Text, VStack, useDisclosure } from "@chakra-ui/react";
import {memo,useCallback,VFC}from"react";
import { useHistory } from "react-router-dom";
import{HamburgerIcon}from "@chakra-ui/icons";
import { useLoginUser } from "../../../hooks/useLoginUser";
import { auth } from "../../../firebase";
import { useRecruitTeam } from "../../../hooks/useRecruitTeam";

export const Footer: VFC = memo(()=>{
    
    return (
    <>  
    <Box as="footer" 
          bgColor="gray.200" 
          p={10}
      mt={3}
      
      //bottom={0}
      
      //zIndex={1}
    >
    <Flex justifyContent="center">
        <Text>© 2023 Collaboration Park.All rights reserved.</Text>
    </Flex>    
        </Box>
    </>
    );
});