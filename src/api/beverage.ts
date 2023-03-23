import { IBeer, ICoffee, IWine } from "../types/beverage"
import { BASE_URL } from "./const"

interface IOrder {
  from: number,
  size: number
}

type value = string[] | undefined

export const getBeer = async (types: string | null): Promise<IBeer[]> => {
  // const response = await fetch(`${BASE_URL}/beers/${types || 'ale'}`)
  const response = await fetch(`${BASE_URL}/beers/ale`)
  return response.ok ? await response.json() : null
}

export const getSingletWine = async (values: value, from: number, size: number): Promise<IWine[]> => {
    const res = await fetch(`${BASE_URL}/wines/${values ? values[0] : 'reds'}`)
    if(!res.ok) return;
    const resJson = await res.json()
    const result = resJson.slice(from,size)
    return result
}

export const getMultiWine = async (values: value, from: number, size: number): Promise<IWine[]> => {
  const list = []
  for(const value of values) {
    const res = await fetch(`${BASE_URL}/wines/${value}`)
    if(!res.ok) return list;
    const resJson = await res.json()
    list.push(...resJson)
  }
  const result = list.slice(from, size)
  return result
}


export const getCoffee = async (types: string | null): Promise<ICoffee[]> => {
  // const response = await fetch(`${BASE_URL}/beers/${types || 'ale'}`)
  const response = await fetch(`${BASE_URL}/coffee/iced`)
  return response.ok ? await response.json() : null
}