import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import{memo,ReactNode,VFC}from"react";

type Props={
    userid:string;
   imageUrl:string;
   userName:string;
   industry:Array<string>;
   onClick:(id:string)=>void;
};

export const UserCard:VFC<Props>=memo((props)=>{
    const {userid,imageUrl,userName,industry,onClick}=props;
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
              <Image 
              borderRadius="full"
              boxSize="160px" 
              src={imageUrl}
              alt={userName}
              m="auto"
              />
              <Text fontSize="lg" fontWeight="bold">{userName}</Text>
              <Text fontSize="md" color="blue.700" fontWeight="bold">志望業界</Text>
              {industry.map((oneIndustry,index)=>(
                <Text fontSize="sm" color="gray" key={index} >{oneIndustry}</Text>
              ))}
              
          </Stack>
      </Box>
      </Flex>
    );
});