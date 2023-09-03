import { useContext } from "react"
import { RecruitsContext, RecruitsContextType } from "../providers/RecruitsProvider"


export const useRecruits =():RecruitsContextType =>useContext(RecruitsContext)