import { IWine, IWineApiOpt } from "../types/wine"
import { BASE_URL } from "./const"

type value = string[] 

export const getSingletWine = async (wineApiOpt:IWineApiOpt): Promise<IWine[] | undefined> => {
    const {value, start = 0, limit = 20, sort = "id", order = "asc"} =  wineApiOpt
    const res = await fetch(`${BASE_URL}/${value}?_limit=20&_start=${start}&_sort=${sort}&_order=${order}`)
    if(!res.ok) return;
    const resJson = await res.json()
    return resJson
}

export const getMultiWine = async (values: value, from: number, size: number): Promise<IWine[] | undefined> => {
  const list = []
  for(const value of values) {
    const res = await fetch(`${BASE_URL}/wines/${value}`)
    if(!res.ok) return list;
    const resJson:string[] = await res.json()
    list.push(...resJson)
  }
  const result = list.slice(from, size)
  return result
}