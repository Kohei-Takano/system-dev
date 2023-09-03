import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import{memo,ReactNode,VFC}from"react";

type Props={
    applicationid:string;
   text:string;
   onClick:(id:string)=>void;
};

export const ApplicationCard:VFC<Props>=memo((props)=>{
    const {applicationid,text,onClick}=props;
    return(
    <Flex align="center" justify="center" height="180px">
        <Box
        w="2xl" 
        bg="white" 
        borderRadius="md" 
        shadow="md" 
        p={4}
        _hover={{cursor:"pointer",opacity:0.8}}
        onClick={()=>onClick(applicationid)}
        >
          <Stack textAlign="center" spacing={6} py={4} px={10}>
              <Text fontSize="lg" fontWeight="bold">{text}</Text>
          </Stack>
        </Box>
      </Flex>
    );
});