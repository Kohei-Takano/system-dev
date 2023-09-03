import { Center, Heading, Spinner, Stack, Wrap, WrapItem } from "@chakra-ui/react";
import {memo,useEffect,VFC}from"react";
import { BigButton } from "../atoms/button/BigButton";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useRecruits } from "../../hooks/useRecruits";
import { RecruitCard } from "../organisms/recruit/RecruitCard";
import { useRecruitTeam } from "../../hooks/useRecruitTeam";
import { auth } from "../../firebase";
import { getAuth } from "firebase/auth";
import { Recruit } from "../../types/api/recruit";
import { useRecruitDetailSearch } from "../../hooks/useRecruitDetailSearch";
import { useRecruitDetail } from "../../hooks/useRecruitDetail";

export const CoDeveloper: VFC = memo(()=>{
    const{login,loading}=useAuth();
    
    const{recruits,applications}=useRecruitTeam();
    const auth=getAuth();
    const history=useHistory();
    const {recruitDetail}=useRecruitDetail();
    const {recruitDetailSearch}=useRecruitDetailSearch();
    const onClickNewRecruit=()=>history.push("/home/co_developer/new_recruit")
    const onClickRecruitSearch=()=>history.push("/home/co_developer/search")
    const onClickRecruitDetail=(recruitId:string)=>recruitDetail(recruitId)//history.push(`/home/co_developer/${recruitId}`)
    const onClickParticipantDetail=(recruitId:string)=>history.push(`/home/co_developer/participant/${recruitId}`)
    const onClickRecruitmentDetail=(recruitId:string)=>recruitDetailSearch(recruitId)
    //history.push(`/home/co_developer/search/result/${recruitId}`)
    
    const myRecruit=[]
    for (const recruit of recruits){
        if(recruit.userid===auth.currentUser?.uid){
            myRecruit.push(recruit)
        }
    }
    const applyRecruit = [];
    for (const recruit of recruits) {
        if (applications.includes(recruit.recruitid)) {
          applyRecruit.push(recruit);
        }
        
      }
      
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
    {loading ? (
        <Center h="100vh">
            <Spinner/>
        </Center>
        ):(
    <Wrap p={{base:4,md:10}} justify="center">
        {myRecruit?.map((recruit:Recruit)=>(
            <WrapItem key={recruit.recruitid} >
                <RecruitCard
                    recruitid={recruit.recruitid} 
                    recruitTitle={recruit.recruitTitle}
                    onClick={onClickRecruitDetail}
                />
            </WrapItem>
        ))}
    </Wrap>
        )}
    <Heading as="h2" p={6} size="xl" textAlign="center">自分が参加中のチーム</Heading>
    {loading ? (
        <Center h="100vh">
            <Spinner/>
        </Center>
        ):(
    <Wrap p={{base:4,md:10}} justify="center">
        {applyRecruit?.map((recruit:Recruit)=>(
            <WrapItem key={recruit.recruitid} >
                <RecruitCard
                    recruitid={recruit.recruitid} 
                    recruitTitle={recruit.recruitTitle}
                    onClick={onClickParticipantDetail}
                />
            </WrapItem>
        ))}
    </Wrap>
        )}
    <Heading as="h2" p={6} size="xl" textAlign="center">参加申請中のチーム</Heading>
    {loading ? (
        <Center h="100vh">
            <Spinner/>
        </Center>
        ):(
    <Wrap p={{base:4,md:10}} justify="center">
        {applyRecruit?.map((recruit:Recruit)=>(
            <WrapItem key={recruit.recruitid} >
                <RecruitCard
                    recruitid={recruit.recruitid} 
                    recruitTitle={recruit.recruitTitle}
                    onClick={onClickRecruitmentDetail}
                />
            </WrapItem>
        ))}
    </Wrap>
        )}
    </>
    )
});