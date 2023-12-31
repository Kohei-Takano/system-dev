import { Box, Image, Stack, Text } from "@chakra-ui/react";
import{memo,ReactNode,VFC}from"react";

type Props={
    userid:string;
   userName:string;
   industry:Array<string>;
   onClick:(id:string)=>void;
};

export const Application:VFC<Props>=memo((props)=>{
    const {userid,userName,industry,onClick}=props;
    return(
        <Box
        w="1200px" 
        h="200px" 
        bg="white" 
        borderRadius="10px" 
        shadow="md" 
        p={4}
        _hover={{cursor:"pointer",opacity:0.8}}
        onClick={()=>onClick(userid)}
        >
          <Stack textAlign="center">
              <Text fontSize="lg" fontWeight="bold">{industry}</Text>
              <Text fontSize="sm" color="gray">{userName}</Text>
          </Stack>
      </Box>
    );
});