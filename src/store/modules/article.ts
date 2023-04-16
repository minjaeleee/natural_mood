import { Dispatch } from "redux"
import produce, { Draft } from "immer"

import { statusType } from "./statusType"
import { IAddArticleItemsFailAction, IAddArticleItemsRequestAction, IAddArticleItemsSuccessAction, IDeleteArticleItemsFailAction, IDeleteArticleItemsRequestAction, IDeleteArticleItemsSuccessAction, IGetArticleItemsFailAction, IGetArticleItemsRequestAction, IGetArticleItemsSuccessAction, IUpdateArticleItemsFailAction, IUpdateArticleItemsRequestAction, IUpdateArticleItemsSuccesAction,IArticleItemState, IPostItem } from "../../types/article"
import { createPost, deletePost, getAllPosts, getPost, updatePost } from "../../api/articleAPI"

export const GET_ARTICLE_REQUEST = "article/GET_ARTICLE_REQUEST" as const 
export const GET_ARTICLE_SUCCESS = "article/GET_ARTICLE_SUCCESS" as const
export const GET_ARTICLE_FAIL = "article/GET_ARTICLE_FAIL" as const

export const ADD_ARTICLE_REQUEST = "article/ADD_ARTICLE_REQUEST" as const
export const ADD_ARTICLE_SUCCESS = "article/ADD_ARTICLE_SUCCESS" as const
export const ADD_ARTICLE_FAIL = "article/ADD_ARTICLE_FAIL" as const

export const UPDATE_ARTICLE_REQUEST = "article/UPDATE_ARTICLE_REQUEST" as const
export const UPDATE_ARTICLE_SUCCESS = "article/UPDATE_ARTICLE_SUCCESS" as const
export const UPDATE_ARTICLE_FAIL = "article/UPDATE_ARTICLE_FAIL" as const

export const DELETE_ARTICLE_REQUEST = "article/DELETE_ARTICLE_REQUEST" as const
export const DELETE_ARTICLE_SUCCESS = "article/DELETE_ARTICLE_SUCCESS" as const
export const DELETE_ARTICLE_FAIL = "article/DELETE_ARTICLE_FAIL" as const

type GetArticleItemsAction = IGetArticleItemsRequestAction | IGetArticleItemsSuccessAction | IGetArticleItemsFailAction
type AddArticleItemsAction = IAddArticleItemsRequestAction | IAddArticleItemsSuccessAction | IAddArticleItemsFailAction
type UpdateArticleItemsAction = IUpdateArticleItemsRequestAction | IUpdateArticleItemsSuccesAction | IUpdateArticleItemsFailAction
type DeleteArticleItemsAction = IDeleteArticleItemsRequestAction | IDeleteArticleItemsSuccessAction | IDeleteArticleItemsFailAction

const getErrorMessage= (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
}

export const getArticleItems = (id?:number) => async(dispatch:Dispatch<GetArticleItemsAction>) => {
  dispatch({type: GET_ARTICLE_REQUEST})
  
  try {
    if(id) {
     // detail article req
      const getItem = await getPost(id)
      dispatch({type: GET_ARTICLE_SUCCESS, items: [getItem.result]})
      return;
    } 
    const getItems = await getAllPosts()
    dispatch({type: GET_ARTICLE_SUCCESS, items: getItems.result})
  } catch(error) {
    dispatch({type: GET_ARTICLE_FAIL, error: getErrorMessage(error)})
  }
}

export const addArticleItem = (items: IPostItem) => async(dispatch:Dispatch<AddArticleItemsAction>) => {
  dispatch({type: ADD_ARTICLE_REQUEST})
  
  try {
    const getAddItem = await createPost(items)
    dispatch({type: ADD_ARTICLE_SUCCESS, items: getAddItem.result})
      return;
  } catch(error) {
    dispatch({type: ADD_ARTICLE_FAIL, error: getErrorMessage(error)})
  }
}

export const updateArticleItem = (items: IPostItem, id: number) => async(dispatch:Dispatch<UpdateArticleItemsAction>) => {
  dispatch({type: UPDATE_ARTICLE_REQUEST})
  
  try {
    const getUpdateItem = await updatePost(items,id)
    dispatch({type: UPDATE_ARTICLE_SUCCESS, items: getUpdateItem.result})
      return;
  } catch(error) {
    dispatch({type: UPDATE_ARTICLE_FAIL, error: getErrorMessage(error)})
  }
}

export const deleteArticleItem = (id:number) => async(dispatch:Dispatch<DeleteArticleItemsAction>) => {
  dispatch({type: DELETE_ARTICLE_REQUEST})
  
  try {
    await deletePost(id)
    dispatch({type: DELETE_ARTICLE_SUCCESS, itemId: id})
      return;
  } catch(error) {
    dispatch({type: DELETE_ARTICLE_FAIL, error: getErrorMessage(error)})
  }
}

const initialState: IArticleItemState = {
  status: "IDLE",
  error: null,
  data: []
}

export const aritlce = (
  state:
    IArticleItemState = initialState, 
  action: 
    GetArticleItemsAction | 
    AddArticleItemsAction |
    UpdateArticleItemsAction | 
    DeleteArticleItemsAction
  ) => {
    switch(action.type) {
      case GET_ARTICLE_REQUEST:
        return produce(state, (draft: Draft<IArticleItemState>) => {
          draft.status =  statusType.req
        })
      case GET_ARTICLE_SUCCESS:
        return produce(state, (draft: Draft<IArticleItemState>) => {
          draft.status =  statusType.success
          draft.data = [...action.items]
        })
      case GET_ARTICLE_FAIL:
        return produce(state, (draft: Draft<IArticleItemState>) => {
          draft.status =  statusType.fail
          draft.error = action.error
        })
      case ADD_ARTICLE_REQUEST:
        return produce(state, (draft: Draft<IArticleItemState>) => {
          draft.status =  statusType.req
        })
      case ADD_ARTICLE_SUCCESS:
        return produce(state, (draft: Draft<IArticleItemState>) => {
          draft.status =  statusType.success
          draft.data.push({...action.items})
        })
      case ADD_ARTICLE_FAIL:
        return produce(state, (draft: Draft<IArticleItemState>) => {
          draft.status =  statusType.fail
          draft.error = action.error
        })
      case UPDATE_ARTICLE_REQUEST:
        return produce(state, (draft: Draft<IArticleItemState>) => {
          draft.status =  statusType.req
        })
      case UPDATE_ARTICLE_SUCCESS:
        return produce(state, (draft: Draft<IArticleItemState>) => {
          draft.status = statusType.success
          let target = draft.data.find(item => item.id === action.items.id)
          target = {...action.items}
        })
      case UPDATE_ARTICLE_FAIL:
        return produce(state, (draft: Draft<IArticleItemState>) => {
          draft.status =  statusType.fail
          draft.error = action.error
        })
      case DELETE_ARTICLE_REQUEST:
        return produce(state, (draft: Draft<IArticleItemState>) => {
          draft.status = statusType.req
        })
      case DELETE_ARTICLE_SUCCESS: 
        return produce(state, (draft: Draft<IArticleItemState>) => {
          draft.status = statusType.success
          draft.data = draft.data.filter(item => item.id !== action.itemId)
        })
      case DELETE_ARTICLE_FAIL:
        return produce(state, (draft: Draft<IArticleItemState>) => {
          draft.status = statusType.fail
          draft.error = action.error
        })
      default:
        return {...state}
  }
}