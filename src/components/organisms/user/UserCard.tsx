import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import{memo,ReactNode,VFC}from"react";

type Props={
    userid:string;
   //imageUrl:string;
   userName:string;
   programming:Array<string>;
   onClick:(id:string)=>void;
};

export const UserCard:VFC<Props>=memo((props)=>{
    const {userid,userName,programming,onClick}=props;
    return(
        <Flex align="center" justify="center">
        <Box
        w="260px" 
       
        bg="white" 
        borderRadius="10px" 
        shadow="md" 
        p={4}
        _hover={{cursor:"pointer",opacity:0.8}}
        onClick={()=>onClick(userid)}
        >
          <Stack textAlign="center">
              <Text fontSize="lg" fontWeight="bold">{userName}</Text>
              <Text fontSize="md" color="blue.700" fontWeight="bold">得意なプログラミング言語</Text>
              {programming.map((oneProgramming,index)=>(
                <Text fontSize="sm" color="gray" key={index} >{oneProgramming}</Text>
              ))}
              
          </Stack>
      </Box>
      </Flex>
    );
});