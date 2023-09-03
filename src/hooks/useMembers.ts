import { useContext } from "react"
import { MembersContext, MembersContextType } from "../providers/MembersProvider"


export const useMembers =():MembersContextType =>useContext(MembersContext)