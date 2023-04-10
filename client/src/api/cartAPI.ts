import { ICartItems, ICreateUsersCartItemsRes, IDeleteUserCartItemsRes, IGetUsersCartItemsReq, IGetUsersCartItemsRes, IUpdateUsersCartItemsReqArgs, IUpdateUsersCartItmesRes } from "../types/cartTypes"
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

export const updateUsersCartItems = async(args:IUpdateUsersCartItemsReqArgs): Promise<IUpdateUsersCartItmesRes> => {
  const res = await fetch(`${BASE_URL}/cart/${args.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      amount: args.amount,
      totalPrice: args.totalPrice
    })
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

export const deleteUsersCartItems = async(id: number): Promise<IDeleteUserCartItemsRes> => {
  const res = await fetch(`${BASE_URL}/cart/${id}`,{
    method: "DELETE"
    }
  )

  if(!res.ok) {
    return {
      status: "fail"
    }
  }

  return {
    status: "success",
    result: id
  }
}

export const deleteUsersCartAllItems = async(ids: number[]): Promise<void> => {
  const list = []

  ids.forEach(async(id)=>{
    list.push(await fetch(`${BASE_URL}/cart/${id}`, {
      method: "DELETE"
    }))
  })

 await Promise.all(list)
 alert("장바구니를 모두 비웠습니다.")
}