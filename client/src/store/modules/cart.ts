import { Dispatch } from "redux"
import { RootState } from "."
import { createUsersCartItems, deleteUsersCartItems, getUsersCartItems, updateUsersCartItems } from "../../api/cartAPI"
import { ICartItems, ICreateUsersCartItemsRes } from "../../types/cartTypes"

// 액션 타입
const GET_CART_SUCCESS = "cart/GET_CART_SUCCESS" as const
const GET_CART_FAIL = "cart/GET_CART_FAIL" as const
const ADD_CART_SUCCESS = "cart/ADD_CART_SUCCESS" as const
const ADD_CART_FAIL = "cart/ADD_CART_FAIL" as const
const UPDATE_CART_SUCCESS = "cart/UPDATE_CART_SUCCESS" as const
// const UPDATE_CART_FAIL = "cart/UPDATE_CART_FAIL" as const
const DELETE_CART_SUCCESS = 'cart/DELETE_CART_SUCCESS' as const

interface IGetCartItemState {
  type: typeof GET_CART_SUCCESS | typeof GET_CART_FAIL,
  items?: ICartItems[],
  error?: string
}

interface IAddCartItemState {
  type: typeof ADD_CART_SUCCESS | typeof ADD_CART_FAIL,
  items?: ICartItems[],
  error?: string
}

interface IUpdateCartItemState {
  type: typeof UPDATE_CART_SUCCESS,
  items: ICartItems
}

interface IDeleteCartItemState {
  type: typeof DELETE_CART_SUCCESS,
  items: number
}

type CartAction = IGetCartItemState | IAddCartItemState | IUpdateCartItemState | IDeleteCartItemState

export const getCartItems = () => async(dispatch:Dispatch<CartAction>, getState:()=>RootState) => {
  const auth = {...getState().auth}
  console.log("auth",auth)
  try {
    const getItems = await getUsersCartItems(auth.id)
    dispatch({type: GET_CART_SUCCESS, items: getItems.result})
  } catch(error) {
    dispatch({type: GET_CART_FAIL, error})
  }
}

export const createCartItem = (args:ICartItems) => async(dispatch:Dispatch<CartAction>, getState:()=>RootState) => {
  const userId = getState().auth.id

  try {
    await createUsersCartItems({...args, userId})
    dispatch({type:ADD_CART_SUCCESS, items: [args]})
  } catch(error) {
    dispatch({type:ADD_CART_FAIL, error})
  }
}

export const updateCartItems = (args:ICartItems, operator) => async(dispatch:Dispatch<CartAction>, getState:()=>RootState) => {
  // args에는 id와 userId를 반드시 포함홰서 넘겨주어야 한다.
  // arg는 추가 되어야 할 list들
  const getPreviousAllItems = [...getState().cart]
  try {
    // // 중복 추가 업데이트
    if(operator === "plus") {
      const updateItem = getPreviousAllItems.find(list => list.id === args.id)
      updateItem.amount += args.amount
      updateItem.totalPrice += args.totalPrice

      await updateUsersCartItems(updateItem)
      dispatch({type:UPDATE_CART_SUCCESS, items: updateItem})
    }
    if(operator === "minus") {
      const updateItem = getPreviousAllItems.find(list => list.id === args.id)
      updateItem.amount -= args.amount
      updateItem.totalPrice -= args.totalPrice

      await updateUsersCartItems(updateItem)
      dispatch({type:UPDATE_CART_SUCCESS, items: updateItem})
    }
  } catch(e) {
    // dispatch({type:UPDATE_CART_FAIL, error: e})
    console.log(e, "update error")
  }
}

export const deleteCartItems = (id:number) => async(dispatch) => {
  try{
    await deleteUsersCartItems(id)
    dispatch({type:DELETE_CART_SUCCESS, items: id})
  } catch(e) {
    console.log(e, "delete error")
  }
}

export const cart = (state:ICartItems[] = [], action:CartAction) => {
  switch(action.type) {
    case GET_CART_SUCCESS:
      return [...action.items]
    // case GET_CART_FAIL:
    //   return [...action.items, {error: action.error}]
    // case ADD_CART_SUCCESS:
    //   return [...state, ...action.items]
    case UPDATE_CART_SUCCESS:
      const getPreviosItems = [...state]
      getPreviosItems.map(list => {
        if(list.id === action.items.id) {
          return list
        }
        return list
      })
      return getPreviosItems
    case DELETE_CART_SUCCESS:
      const getPreviosItemsForDelete = [...state]
      return getPreviosItemsForDelete.filter(list => list.id !== action.items)
    default: 
      return []
  }   
}
