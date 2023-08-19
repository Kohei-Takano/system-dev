import { UserDetail } from "../components/pages/UserDetail"
import { UserMessages } from "../components/pages/UserMessages"
import { UserSearchResult } from "../components/pages/UserSearchResult"
export const UserSearchRoutes=[
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
]