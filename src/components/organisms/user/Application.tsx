import { Box, Image, Stack, Text } from "@chakra-ui/react";
import{memo,ReactNode,VFC}from"react";

type Props={
    id:number;
   userName:string;
   fullName:string;
   onClick:(id:number)=>void;
};

export const Application:VFC<Props>=memo((props)=>{
    const {id,userName,fullName,onClick}=props;
    return(
        <Box
        w="1200px" 
        h="200px" 
        bg="white" 
        borderRadius="10px" 
        shadow="md" 
        p={4}
        _hover={{cursor:"pointer",opacity:0.8}}
        onClick={()=>onClick(id)}
        >
          <Stack textAlign="center">
              <Text fontSize="lg" fontWeight="bold">{userName}</Text>
              <Text fontSize="sm" color="gray">{fullName}</Text>
          </Stack>
      </Box>
    );
});