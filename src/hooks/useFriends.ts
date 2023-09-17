import { useContext } from "react"
import { FriendsContext, FriendsContextType } from "../providers/FriendsProvider"


export const useFriends =():FriendsContextType =>useContext(FriendsContext)