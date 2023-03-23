import { IBeer, ICoffee, IWine } from "../types/beverage"
import { BASE_URL } from "./const"

interface IOrder {
  from: number,
  size: number
}

type value = string[] | []
type order = IOrder | null

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

export const getBeer = async (types: string | null): Promise<IBeer[]> => {
  // const response = await fetch(`${BASE_URL}/beers/${types || 'ale'}`)
  const response = await fetch(`${BASE_URL}/beers/ale`)
  return response.ok ? await response.json() : null
}

export const getWine = async (values: value, order: order): Promise<IWine[]> => {
  if(values?.length < 2) {
    // 단일 선택 및 기본 값
    const res = await fetch(`${BASE_URL}/wines/${values[0] || 'reds'}`)
    if(!res.ok) return;
    const resJson = await res.json()
    if(order) {
      const result = resJson.slice(order.from, order.size)
      return result
    }
    const result = resJson.slice(0,20)
    return result
  } else {
    // 중복 선택
    const list = []
    for(const value of values) {
      const res = await fetch(`${BASE_URL}/wines/${value}`)
      if(!res.ok) return list;
      const resJson = await res.json()
      list.push(...resJson)
    }
    shuffle(list)
    const result = list.slice(0,20)
    return result
  }
}
export const getCoffee = async (types: string | null): Promise<ICoffee[]> => {
  // const response = await fetch(`${BASE_URL}/beers/${types || 'ale'}`)
  const response = await fetch(`${BASE_URL}/coffee/iced`)
  return response.ok ? await response.json() : null
}