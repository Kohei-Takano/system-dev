import{memo,ReactNode,VFC}from"react";
import { Button } from "@chakra-ui/react";

type Props={
    children:ReactNode;
    loading?:boolean;
    onClick:()=>void;
};

export const MainButton:VFC<Props>=memo((props)=>{
    const {children,loading=false,onClick}=props;
    return(
        <Button bg="teal.400" color="white" _hover={{opacity:0.8}} disabled={loading} isLoading={loading}onClick={onClick}>{children}</Button>
    );
});