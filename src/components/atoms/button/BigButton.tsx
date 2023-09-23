import{memo,ReactNode,VFC}from"react";
import { Box, Button } from "@chakra-ui/react";

type Props={
    children:ReactNode;
    loading?:boolean;
    onClick:()=>void;
};

export const BigButton:VFC<Props>=memo((props)=>{
    const {children,loading=false,onClick}=props;
    return(
        <Box
            as='button'
            height='350px'
            width='350px'
            borderRadius={40}
            fontSize='40px'
            fontWeight='semibold'
            bgGradient='linear(to-r, teal.200, orange.50)'
            color='purple.800'
            shadow="md" 
            _hover={{ opacity:0.5 }}
            disabled={loading} 
            onClick={onClick}
                >
                {children}
                </Box>
    );
});