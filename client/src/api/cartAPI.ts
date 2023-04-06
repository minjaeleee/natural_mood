import { ICartItems, ICreateUsersCartItemsRes, IGetUsersCartItemsReq, IGetUsersCartItemsRes, IUpdateUsersCartItmesRes } from "../types/cartTypes"
import { BASE_URL } from "./const"

export const getUsersCartItems= async(userId:IGetUsersCartItemsReq): Promise<IGetUsersCartItemsRes>  => {
  const res = await fetch(`${BASE_URL}/cart?userId=${userId}`, {
    method: "GET",
  })

  if(!res.ok) return {
    status: "fail"
  }
  
  const getCartInfo = await res.json()
  return {
    status: "success",
    id: getCartInfo.id,
    userId: getCartInfo.userId,
    result: getCartInfo
  }
}

export const createUsersCartItems = async(args:ICartItems): Promise<ICreateUsersCartItemsRes> => {
  const res = await fetch(`${BASE_URL}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({...args})
  })

  if(!res.ok) {
    return {
      status: "fail",
    }
  }
  
  const createCartItem = await res.json()
  return {
    status: "success",
    result: createCartItem
  }
}

export const updateUsersCartItems = async(args:ICartItems): Promise<IUpdateUsersCartItmesRes> => {
  const res = await fetch(`${BASE_URL}/cart/${args.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({...args})
  })

  if(!res.ok) {
    return {
      status: "fail",
    }
  }
  
  const updateCartItems = await res.json()
  return {
    status: "success",
    result: updateCartItems
  }
}

export const deleteUsersCartItems = async(id: number) => {
  const res = await fetch(`${BASE_URL}/cart/${id}`,{
    method: "DELETE"
    }
  )

  if(!res.ok) {
    return {
      status: "fail"
    }
  }

  const deleteCartItems = await res.json()
  return {
    status: "success"
  }
}