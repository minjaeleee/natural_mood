import { ADD_CART_FAIL, ADD_CART_REQUEST, ADD_CART_SUCCESS, DELETE_ALL_CART_FAIL, DELETE_ALL_CART_REQUEST, DELETE_ALL_CART_SUCCESS, DELETE_CART_FAIL, DELETE_CART_REQUEST, DELETE_CART_SUCCESS, GET_CART_FAIL, GET_CART_REQUEST, GET_CART_SUCCESS, UPDATE_CART_FAIL, UPDATE_CART_REQUEST, UPDATE_CART_SUCCESS } from "../store/modules/cart"

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
  result?: ICartItems

}

export type IGetUsersCartItemsReq = number

export interface IGetUsersCartItemsRes {
  status: "success" | "fail",
  id?: number,
  userId?: number,
  result?: ICartItems[]
}

export interface IUpdateUsersCartItemsReqArgs {
  id: number,
  amount: number,
  totalPrice: number,
}

export interface IUpdateUsersCartItmesRes {
  status: "success" | "fail",
  result?: ICartItems
}
export interface IDeleteUserCartItemsRes {
  status: "success" | "fail",
  result?: number,
}

export interface IGetCartItemsRequestAction {
  type: typeof GET_CART_REQUEST
}

export interface IGetCartItemsFailAction {
  type: typeof GET_CART_FAIL,
  error: string | null
}
export interface IGetCartItemsSuccessAction {
  type: typeof GET_CART_SUCCESS,
  items: ICartItems[]
}
export interface IAddCartItemsRequestAction {
  type: typeof ADD_CART_REQUEST
}
export interface IAddCartItemsSuccessACtion {
  type: typeof ADD_CART_SUCCESS,
  items: ICartItems[]
}
export interface IAddCartItemsFailAction {
  type: typeof ADD_CART_FAIL,
  error: string | null
}

export interface IUpdateCartItemsRequestAction {
  type: typeof UPDATE_CART_REQUEST
}
export interface IUpdateCartItemsSuccessAction {
  type: typeof UPDATE_CART_SUCCESS,
  items: ICartItems[]
}
export interface IUpdateCartItemsFailAction {
  type: typeof UPDATE_CART_FAIL,
  error: string | null
}
export interface IDeleteCartItemsRequestAction {
  type: typeof DELETE_CART_REQUEST
}
export interface IDeleteCartItemsSuccessAction {
  type: typeof DELETE_CART_SUCCESS
  itemId: number
}
export interface IDeleteCartItemsFailAction {
  type: typeof DELETE_CART_FAIL,
  error: string | null
}
export interface IDeleteCartAllItemsRequestAction {
  type: typeof DELETE_ALL_CART_REQUEST
}
export interface IDeleteCartAllItemsSuccessAction {
  type: typeof DELETE_ALL_CART_SUCCESS
  items: []
}
export interface IDeleteCartAllItemsFailAction {
  type: typeof DELETE_ALL_CART_FAIL
  error: string | null
}

export type ICartState = {
  status: string,
  error: string | null,
  data: ICartItems[]
}