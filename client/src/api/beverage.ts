import { IWine } from "../types/beverage"
import { BASE_URL } from "./const"

type value = string[] 

export const getSingletWine = async (values: value, from: number, size: number): Promise<IWine[] | undefined> => {
    const res = await fetch(`${BASE_URL}/wines/${values ? values[0] : 'reds'}`)
    if(!res.ok) return;
    const resJson = await res.json()
    const result = resJson.slice(from,size)
    return result
}

export const getMultiWine = async (values: value, from: number, size: number): Promise<IWine[] | undefined> => {
  const list = []
  for(const value of values) {
    const res = await fetch(`${BASE_URL}/wines/${value}`)
    if(!res.ok) return list;
    const resJson:JSON = await res.json()
    list.push(...resJson)
  }
  const result = list.slice(from, size)
  return result
}