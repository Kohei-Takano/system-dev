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

export const Router:FC=memo(()=>{
    return(
        <Switch>
            <LoginUserProvider>
                <RecruitsProvider>
                    <RecruitDataProvider>
                        <MembersProvider>
                            <MessagesProvider>
                        <ListProvider>
            <UsersProvider>
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
            /></UsersProvider>
            </ListProvider>
            </MessagesProvider>
            </MembersProvider>
            </RecruitDataProvider>
            </RecruitsProvider>
            </LoginUserProvider>
            <Route path="*">
                <Page404/>
            </Route>
        </Switch>
                )
});