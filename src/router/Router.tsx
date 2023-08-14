import {memo,FC}from "react";
import { Route, Routes } from "react-router-dom";

import { Login } from "../components/pages/Login";
import { Register } from "../components/pages/Register";

import { Home } from "../components/pages/Home";
import { UserSearch } from "../components/pages/UserSearch";
import { UserSearchResult } from "../components/pages/UserSearchResult";
import { UserDetail } from "../components/pages/UserDetail";
import { UserMessages } from "../components/pages/UserMessages";
import { CoDeveloper } from "../components/pages/CoDeveloper";
import { ParticipantsMessages } from "../components/pages/ParticipantsMessages";
import { RecruitmentsSearch } from "../components/pages/RecruitmentsSearch";
import { RecruitmentsSearchResult } from "../components/pages/RecruitmentsSearchResult";
import { RecruitmentDetail } from "../components/pages/RecruitmentDetail";
import { ApplicationMessage } from "../components/pages/ApplicationMessage";
import { ContentRecruitment } from "../components/pages/ContentRecruitment";
import { RecruitmentMessages } from "../components/pages/RecruitmentMessages";
import { NewRecruitment } from "../components/pages/NewRecruitment";
import { ApplicationList } from "../components/pages/ApplicationList";
import { FriendsList } from "../components/pages/FriendsList";
import { UserRegister } from "../components/pages/UserRegister";

export const Router:FC=memo(()=>{
    return(
        <Routes>
          <Route path="/" element={<Login/>}>
            <Route path={`register`} element={<Register/>}/>
            <Route path={`home`} element={<Home/>}>
                <Route path="user_search"element={<UserSearch/>}>
                    <Route path="result"element={<UserSearchResult/>}>
                        <Route path="user_detail"element={<UserDetail/>}>
                            <Route path="userid"element={<UserMessages/>}>
                            </Route>
                        </Route>
                        </Route>
                        </Route>
                <Route path="co_developer"element={<CoDeveloper/>}>
                    <Route path="recruitid"element={<ParticipantsMessages/>}/>
                    <Route path="search"element={<RecruitmentsSearch/>}>
                        <Route path="result"element={<RecruitmentsSearchResult/>}>
                            <Route path="detail"element={<RecruitmentDetail/>}>
                                <Route path="application"element={<ApplicationMessage/>}>
                                    <Route path="content"element={<ContentRecruitment/>}/>
                                </Route>
                            </Route>
                        </Route>
                    </Route>
                    <Route path="recruitmentid"element={<RecruitmentMessages/>}>
                        <Route path="application_list"element={<ApplicationList/>}/>
                    </Route>
                    <Route path="new_recruit"element={<NewRecruitment/>}/>
                </Route>
                <Route path="friend_list"element={<FriendsList/>}/>
                <Route path="user_info"element={<UserRegister/>}/>
            </Route>
        </Route>
        </Routes>          
    )
});