import {memo,FC}from "react";
import { Route, Switch } from "react-router-dom";

import { Login } from "../components/pages/Login";
import { Register } from "../components/pages/Register";
import { homeRoutes } from "./HomeRoutes";
import { Page404 } from "../components/pages/Page404";
import { HeaderLayout } from "../components/templates/HeaderLayout";
import { LoginUserProvider } from "../providers/LoginUserProvider";
import { UsersProvider } from "../providers/OtherUserProvider";
import { RecruitsProvider } from "../providers/RecruitsProvider";
import { RecruitDataProvider } from "../providers/RecruitDataProvider";
import { ListProvider } from "../providers/ListProvider";
import { MembersProvider } from "../providers/MembersProvider";
import { MessagesProvider } from "../providers/MessagesProvider";
import { OtherTeamMembersProvider } from "../providers/OtherTeamMembersProvider";
import { ParticipationProvider } from "../providers/ParticipationProvider";
import { ParticipantMessagesProvider } from "../providers/ParticipantMessagesProvider";
import { FriendMessagesProvider } from "../providers/FriendMessagesProvider";
import { FriendsProvider } from "../providers/FriendsProvider";

export const Router:FC=memo(()=>{
    return(
        <Switch>
            <LoginUserProvider>
                <FriendsProvider>
                <RecruitsProvider>
                    <RecruitDataProvider>
                        <MembersProvider>
                            <MessagesProvider>
                                <OtherTeamMembersProvider>
                                    <ParticipationProvider>
                                    <ParticipantMessagesProvider>
                        <ListProvider>
            <UsersProvider>
                <FriendMessagesProvider>
            <Route exact path="/"> 
                <Login/>
            </Route>
            <Route path="/register">
                <Register/>
            </Route> 
            <Route path="/home" render={({match:{url}})=>(
                <Switch>
                    {homeRoutes.map((route)=>(
                        
                        <Route key={route.path} exact={route.exact} path={`${url}${route.path}`}>
                            <HeaderLayout>{route.children}</HeaderLayout>
                        </Route>
                       
                    ))} 
                </Switch>
            )}
            /></FriendMessagesProvider>
            </UsersProvider>
            </ListProvider>
            </ParticipantMessagesProvider>
            </ParticipationProvider>
            </OtherTeamMembersProvider>
            </MessagesProvider>
            </MembersProvider>
            </RecruitDataProvider>
            </RecruitsProvider>
            </FriendsProvider>
            </LoginUserProvider>
            <Route path="*">
                <Page404/>
            </Route>
        </Switch>
                )
});