export interface ICartItems {
  id?: number,
  userId?: number,
  image: string,
  winery: string,
  wine: string,
  wineType: string,
  originalPrice?: number,
  amount?: number,
  totalPrice?: number,
}

export interface ICreateUsersCartItemsRes {
  status: "success" | "fail",
  result?: {
    cartItems: ICartItems[],
    id: number,
    userId: number
  }
}

export type IGetUsersCartItemsReq = number

export interface IGetUsersCartItemsRes {
  status: "success" | "fail",
  id?: number,
  userId?: number,
  result?: ICartItems[]
}
export interface IUpdateUsersCartItmesRes {
  status: "success" | "fail",
  result?: {
    cartItems: ICartItems[],
    id: number,
    userId: number
  }
}