import { useContext } from "react"
import { RecruitDataContext, RecruitDataContextType } from "../providers/RecruitDataProvider"


export const useRecruitData =():RecruitDataContextType =>useContext(RecruitDataContext)