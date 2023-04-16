import { Dispatch } from "redux"
import produce, { Draft } from 'immer';

import { RootState } from "."
import { createUsersCartItems, deleteUsersCartAllItems, deleteUsersCartItems, getUsersCartItems, updateUsersCartItems } from "../../api/cartAPI"
import { IAddCartItemsRequestAction, IAddCartItemsSuccessACtion, IAddCartItemsFailAction, ICartItems, ICartState, IGetCartItemsFailAction, IGetCartItemsRequestAction, IGetCartItemsSuccessAction, IUpdateUsersCartItemsReqArgs, IUpdateCartItemsRequestAction, IUpdateCartItemsSuccessAction, IUpdateCartItemsFailAction, IDeleteCartItemsRequestAction, IDeleteCartItemsSuccessAction, IDeleteCartItemsFailAction, IDeleteCartAllItemsRequestAction, IDeleteCartAllItemsFailAction, IDeleteCartAllItemsSuccessAction } from "../../types/cartTypes"
import { statusType } from "./statusType";

// 액션 타입
export const GET_CART_REQUEST = "cart/GET_CART_REQUEST" as const
export const GET_CART_SUCCESS = "cart/GET_CART_SUCCESS" as const
export const GET_CART_FAIL = "cart/GET_CART_FAIL" as const

export const ADD_CART_REQUEST = "cart/ADD_CART_REQUEST" as const
export const ADD_CART_SUCCESS = "cart/ADD_CART_SUCCESS" as const
export const ADD_CART_FAIL = "cart/ADD_CART_FAIL" as const

export const UPDATE_CART_REQUEST = "cart/UPDATE_CART_REQUEST" as const
export const UPDATE_CART_SUCCESS = "cart/UPDATE_CART_SUCCESS" as const
export const UPDATE_CART_FAIL = "cart/UPDATE_CART_FAIL" as const

export const DELETE_CART_REQUEST = "cart/DELETE_CART_REQUEST" as const
export const DELETE_CART_SUCCESS = "cart/DELETE_CART_SUCCESS" as const
export const DELETE_CART_FAIL = "cart/DELETE_CART_FAIL" as const

export const DELETE_ALL_CART_REQUEST = "cart/DELETE_ALL_CART_REQUEST" as const
export const DELETE_ALL_CART_SUCCESS = "cart/DELETE_ALL_CART_SUCCESS" as const
export const DELETE_ALL_CART_FAIL = "cart/DELETE_ALL_CART_FAIL" as const

type GetCartItemsAction = IGetCartItemsRequestAction | IGetCartItemsSuccessAction | IGetCartItemsFailAction
type AddCartItemsAction = IAddCartItemsRequestAction | IAddCartItemsSuccessACtion | IAddCartItemsFailAction
type UpdateCartItemsAction = IUpdateCartItemsRequestAction | IUpdateCartItemsSuccessAction | IUpdateCartItemsFailAction
type DeleteCartItemsAction = IDeleteCartItemsRequestAction | IDeleteCartItemsSuccessAction | IDeleteCartItemsFailAction
type DeleteCartAllItemsAction = IDeleteCartAllItemsRequestAction | IDeleteCartAllItemsSuccessAction | IDeleteCartAllItemsFailAction

const getErrorMessage= (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
}

export const getCartItems = () => async(dispatch:Dispatch<GetCartItemsAction>, getState:()=>RootState) => {
  dispatch({type: GET_CART_REQUEST})
  
  try {
    const auth = {...getState().auth}
    const getItems = await getUsersCartItems(auth.data.id)
    dispatch({type: GET_CART_SUCCESS, items: getItems.result})
  } catch(error) {
    dispatch({type: GET_CART_FAIL, error: getErrorMessage(error)})
  }
}

export const addCartItem = (args:ICartItems) => async(dispatch:Dispatch<AddCartItemsAction>, getState:()=>RootState) => {
  dispatch({type: ADD_CART_REQUEST})

  try {
    const userId = getState().auth.data.id
    const getAddItem = await createUsersCartItems({...args, userId})
    dispatch({type: ADD_CART_SUCCESS, items: [getAddItem.result]})
  } catch(error) {
    dispatch({type: ADD_CART_FAIL, error: getErrorMessage(error)})
    throw error
  }
}

export const updateCartItems = (args: IUpdateUsersCartItemsReqArgs) => async(dispatch:Dispatch<UpdateCartItemsAction>) => {
  dispatch({type:UPDATE_CART_REQUEST})

  try {
    const getUpdateItem = await updateUsersCartItems(args)
    dispatch({type:UPDATE_CART_SUCCESS, items: [getUpdateItem.result]})
  } catch(error) {
    dispatch({type: UPDATE_CART_FAIL, error: getErrorMessage(error)})
  }
}

export const deleteCartItems = (id:number) => async(dispatch:Dispatch<DeleteCartItemsAction>) => {
  dispatch({type:DELETE_CART_REQUEST})

  try{
    await deleteUsersCartItems(id)
    dispatch({type:DELETE_CART_SUCCESS, itemId: id})
  } catch(error) {
    dispatch({type:DELETE_CART_FAIL, error: getErrorMessage(error)})
  }
}

export const deleteCartAllItems = (ids: number[]) => async(dispatch:Dispatch<DeleteCartAllItemsAction>) => {
  dispatch({type:DELETE_ALL_CART_REQUEST})

  try {
    await deleteUsersCartAllItems(ids)
    dispatch({type:DELETE_ALL_CART_SUCCESS, items: []})
  } catch(error) {
    dispatch({type:DELETE_ALL_CART_FAIL, error: getErrorMessage(error)})
  }
}

const initialState: ICartState= {
  status: "IDLE",
  error: null,
  data: []
}

export const cart = (
    state:
      ICartState = initialState, 
    action: 
      GetCartItemsAction |
      AddCartItemsAction |
      UpdateCartItemsAction |
      DeleteCartItemsAction |
      DeleteCartAllItemsAction
  ) => {
  switch(action.type) {
    case GET_CART_REQUEST:
      return produce(state, (draft: Draft<ICartState>) => {
        draft.status = statusType.req
      })
    case GET_CART_SUCCESS:
      return produce(state, (draft: Draft<ICartState>) => {
        draft.status = statusType.success
        draft.data = [...action.items]
      })
    case GET_CART_FAIL:
      return produce(state, (draft: Draft<ICartState>) => {
        draft.status = statusType.fail
        draft.error = action.error
      })
    case ADD_CART_REQUEST:
      return produce(state, (draft: Draft<ICartState>) => {
        draft.status = statusType.req
      })
    case ADD_CART_SUCCESS:
      return produce(state, (draft: Draft<ICartState>) => {
        draft.status = statusType.success
        draft.data.push(...action.items)
      })
    case ADD_CART_FAIL:
      return produce(state, (draft: Draft<ICartState>) => {
        draft.status = statusType.fail
        draft.error = action.error
      })
    case UPDATE_CART_REQUEST:
      return produce(state, (draft: Draft<ICartState>) => {
        draft.status = statusType.req
      })
    case UPDATE_CART_SUCCESS:
      return produce(state, (draft: Draft<ICartState>) => {
        const target = draft.data.find(item => item.id === action.items[0].id)
        draft.status = statusType.success
        target.amount = action.items[0].amount
        target.totalPrice = action.items[0].totalPrice
      })
    case UPDATE_CART_FAIL:
      return produce(state, (draft: Draft<ICartState>) => {
        draft.status = statusType.fail
        draft.error = action.error
      })
    case DELETE_CART_REQUEST:
      return produce(state, (draft: Draft<ICartState>) => {
        draft.status = statusType.req
      })
    case DELETE_CART_SUCCESS: 
      return produce(state, (draft: Draft<ICartState>) => {
        draft.status = statusType.success
        draft.data = draft.data.filter(item => item.id !== action.itemId)
      })
    case DELETE_CART_FAIL:
      return produce(state, (draft: Draft<ICartState>) => {
        draft.status = statusType.fail
        draft.error = action.error
      })
    case DELETE_ALL_CART_REQUEST:
      return produce(state, (draft: Draft<ICartState>) => {
        draft.status = statusType.req
      })
    case DELETE_ALL_CART_SUCCESS:
      return produce(state, (draft: Draft<ICartState>) => {
        draft.status = statusType.success
        draft.data = []
      })
    case DELETE_ALL_CART_FAIL:
      return produce(state, (draft: Draft<ICartState>) => {
        draft.status = statusType.fail
        draft.error = action.error
      })
    default: 
      return {...state}
  }   
}
