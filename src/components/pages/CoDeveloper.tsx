import { Heading, Stack, Wrap, WrapItem } from "@chakra-ui/react";
import {memo,useEffect,VFC}from"react";
import { BigButton } from "../atoms/button/BigButton";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
export const CoDeveloper: VFC = memo(()=>{
    const{login,loading}=useAuth();
    const history=useHistory();
    const onClickNewRecruit=()=>history.push("/home/co_developer/new_recruit")
    const onClickRecruitSearch=()=>history.push("/home/co_developer/search")
    useEffect(() => {
        // ローカルストレージから情報を取得
        const storedInfo = localStorage.getItem("loggedInUser");
    
        if (!storedInfo) {
          history.push("/"); // ログインページへ遷移
        }
      }, [history]);
    return (
    <>
    <Heading as="h1" p={6} size="3xl" textAlign="center">共同開発者を探す</Heading>
    <Wrap spacing="30px" p={{base:4,md:10}} justify="center">
            <WrapItem>
                <Stack textAlign="center">
                    <BigButton  loading={loading} onClick={onClickNewRecruit}>新規募集</BigButton>
                </Stack>
            </WrapItem>
            <WrapItem>
                <Stack textAlign="center">
                    <BigButton loading={loading} onClick={onClickRecruitSearch}>他のユーザの募集を検索</BigButton>
                </Stack>
            </WrapItem>
    </Wrap>
    <Heading as="h2" p={6} size="xl" textAlign="center">自分が募集しているチーム</Heading>
    <Heading as="h2" p={6} size="xl" textAlign="center">自分が参加中のチーム</Heading>
    <Heading as="h2" p={6} size="xl" textAlign="center">参加申請中のチーム</Heading>
    </>
    )
});