import { Box, Image, Stack, Text } from "@chakra-ui/react";
import{memo,ReactNode,VFC}from"react";

type Props={
    recruitid:string;
   recruitTitle:string;
   onClick:(id:string)=>void;
};

export const RecruitCard:VFC<Props>=memo((props)=>{
    const {recruitid,recruitTitle,onClick}=props;
    return(
        <Box
        w="800px" 
        h="60px" 
        bg="white" 
        borderRadius="10px" 
        shadow="md" 
        p={4}
        _hover={{cursor:"pointer",opacity:0.8}}
        onClick={()=>onClick(recruitid)}
        >
          <Stack textAlign="center">
              <Text fontSize="lg" fontWeight="bold">{recruitTitle}</Text>
          </Stack>
      </Box>
    );
});