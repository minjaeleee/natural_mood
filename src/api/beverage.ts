import { IBeer, ICoffee, IWine } from "../types/beverage"
import { BASE_URL } from "./const"

export const getBeer = async (types: string | null): Promise<IBeer[]> => {
  // const response = await fetch(`${BASE_URL}/beers/${types || 'ale'}`)
  const response = await fetch(`${BASE_URL}/beers/ale`)
  return response.ok ? await response.json() : null
}

export const getWine = async (types: string | null): Promise<IWine[]> => {
  // const response = await fetch(`${BASE_URL}/beers/${types || 'ale'}`)
  const response = await fetch(`${BASE_URL}/wines/reds`)
  return response.ok ? await response.json() : null

}
export const getCoffee = async (types: string | null): Promise<ICoffee[]> => {
  // const response = await fetch(`${BASE_URL}/beers/${types || 'ale'}`)
  const response = await fetch(`${BASE_URL}/coffee/iced`)
  return response.ok ? await response.json() : null
}