import { IWine, IWineMultiApiOpt, IWineSingleApiOpt } from "../types/wine"
import { BASE_URL } from "./const"

export const getSingletWine = async (wineApiOpt:IWineSingleApiOpt): Promise<IWine[] | undefined> => {
    const {value, start = 0, sort = "price", order = "asc"} =  wineApiOpt
    const res = await fetch(`${BASE_URL}/${value}?_limit=20&_start=${start}&_sort=${sort}&_order=${order}`)
    if(!res.ok) return;
    const resJson = await res.json()
    return resJson
}

export const getMultiWine = async (wineApiOpt:IWineMultiApiOpt): Promise<IWine[] | undefined> => {
  const {values} = wineApiOpt
  const list = []
  for(const value of values) {
    const res = await fetch(`${BASE_URL}/${value}?_limit=15`)
    if(!res.ok) return list;
    const resJson:string[] = await res.json()
    list.push(...resJson)
  }
  
  const newList = list.sort((a,b)=> a.price - b.price)
  return newList
}