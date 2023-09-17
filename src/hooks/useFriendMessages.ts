import { useContext } from "react"
import { FriendMessagesContext, FriendMessagesContextType } from "../providers/FriendMessagesProvider"


export const useFriendMessages =():FriendMessagesContextType =>useContext(FriendMessagesContext)