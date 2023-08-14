import { ApplicationList } from "../components/pages/ApplicationList";
import { ApplicationMessage } from "../components/pages/ApplicationMessage";
import { CoDeveloper } from "../components/pages/CoDeveloper";
import { ContentRecruitment } from "../components/pages/ContentRecruitment";
import { FriendsList } from "../components/pages/FriendsList";
import { Home } from "../components/pages/Home";
import { NewRecruitment } from "../components/pages/NewRecruitment";
import { ParticipantsMessages } from "../components/pages/ParticipantsMessages";
import { RecruitmentDetail } from "../components/pages/RecruitmentDetail";
import {RecruitmentMessages}from"../components/pages/RecruitmentMessages";
import { RecruitmentsSearch } from "../components/pages/RecruitmentsSearch";
import { RecruitmentsSearchResult } from "../components/pages/RecruitmentsSearchResult";
import { UserDetail } from "../components/pages/UserDetail";
import { UserMessages } from "../components/pages/UserMessages";
import { UserRegister } from "../components/pages/UserRegister";
import { UserSearch } from "../components/pages/UserSearch";
import { UserSearchResult } from "../components/pages/UserSearchResult";

export const homeRoutes = [
    {
        path:"/",
        exact:true,
        children:<Home/>
    },
    {
        path:"/user_search",
        exact:true,
        children:<UserSearch/>
    },
    {
        path:"/user_search/result",
        exact:true,
        children:<UserSearchResult/>
    },
    {
        path:"/user_search/result/user_detail",
        exact:true,
        children:<UserDetail/>
    },
    {
        path:"/user_search/result/user_detail/userid",
        exact:true,
        children:<UserMessages/>
    },
    {
        path:"/co_developer",
        exact:true,
        children:<CoDeveloper/>
    },
    {
        path:"/co_developer/recruitid",
        exact:true,
        children:<ParticipantsMessages/>
    },
    {
        path:"/co_developer/search",
        exact:true,
        children:<RecruitmentsSearch/>
    },
    {
        path:"/co_developer/search/result",
        exact:true,
        children:<RecruitmentsSearchResult/>
    },
    {
        path:"/co_developer/search/result/detail",
        exact:true,
        children:<RecruitmentDetail/>
    },
    {
        path:"/co_developer/search/result/detail/application",
        exact:true,
        children:<ApplicationMessage/>
    },
    {
        path:"/co_developer/search/result/detail/application/content",
        exact:true,
        children:<ContentRecruitment/>
    },
    {
        path:"/co_developer/recruitmentid",
        exact:true,
        children:<RecruitmentMessages/>
    },
    {
        path:"/co_developer/new_recruit",
        exact:true,
        children:<NewRecruitment/>
    },
    {
        path:"/co_developer/recruitmentid/application_list",
        exact:true,
        children:<ApplicationList/>
    },
    {
        path:"/friend_list",
        exact:true,
        children:<FriendsList/>
    },
    {
        path:"/user_info",
        exact:true,
        children:<UserRegister/>
    }
]