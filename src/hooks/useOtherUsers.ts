import { useContext } from "react"
import { UsersContext,UsersContextType } from "../providers/OtherUserProvider"

export const useOtherUsers =():UsersContextType =>useContext(UsersContext)