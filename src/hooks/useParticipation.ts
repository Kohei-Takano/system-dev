import { useContext } from "react"
import { MessagesContext, MessagesContextType } from "../providers/MessagesProvider"
import { ParticipationContext, ParticipationContextType } from "../providers/ParticipationProvider"



export const useParticipation =():ParticipationContextType =>useContext(ParticipationContext)