import { useContext } from "react"
import { ParticipantMessagesContext, ParticipantMessagesContextType } from "../providers/ParticipantMessagesProvider"



export const useParticipantMessages =():ParticipantMessagesContextType =>useContext(ParticipantMessagesContext)