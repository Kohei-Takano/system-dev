import { useContext } from "react"
import { MessagesContext, MessagesContextType } from "../providers/MessagesProvider"



export const useMessages =():MessagesContextType =>useContext(MessagesContext)