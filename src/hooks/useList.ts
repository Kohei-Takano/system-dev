import { useContext } from "react"
import { ListContext, ListContextType } from "../providers/ListProvider"



export const useList =():ListContextType =>useContext(ListContext)