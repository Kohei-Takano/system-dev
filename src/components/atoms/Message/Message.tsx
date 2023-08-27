import { Box, Stack, Text } from "@chakra-ui/react";
import{memo,ReactNode,VFC}from"react";

type Props={
   children:ReactNode;
};

export const Message:VFC<Props>=memo((props)=>{
    const {children}=props;
    return(
        <Box
        w="260px" 
        h="130px" 
        bg="white" 
        borderRadius={10}
        shadow="md" 
        p={4}
        _hover={{opacity:0.8}}
        >
          <Stack textAlign="center">
              <Text fontSize="lg" fontWeight="bold">{children}</Text>
          </Stack>
      </Box>
    );
});