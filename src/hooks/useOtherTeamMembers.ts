import { useContext } from "react"
import { OtherTeamMembersContext, OtherTeamMembersContextType } from "../providers/OtherTeamMembersProvider"


export const useOtherTeamMembers =():OtherTeamMembersContextType =>useContext(OtherTeamMembersContext)