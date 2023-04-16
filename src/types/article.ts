import { ADD_ARTICLE_FAIL, ADD_ARTICLE_REQUEST, ADD_ARTICLE_SUCCESS, DELETE_ARTICLE_FAIL, DELETE_ARTICLE_REQUEST, DELETE_ARTICLE_SUCCESS, GET_ARTICLE_FAIL, GET_ARTICLE_REQUEST, GET_ARTICLE_SUCCESS, UPDATE_ARTICLE_FAIL, UPDATE_ARTICLE_REQUEST, UPDATE_ARTICLE_SUCCESS } from "../store/modules/article"

export interface IPostItem {
  id?: number,
  image: string,
  title: string,
  author: string,
  content: string,
  created_at: number
}

export interface IGetAllPostsRes {
  status: "success" | "fail"
  result?: IPostItem[]
}

export interface IGetPostRes {
  status: "success" | "fail"
  result?: IPostItem
}

export interface IAddPostRes {
  status: "success" | "fail"
  result?: IPostItem
}

export interface IUpdatePostRes {
  status: "success" | "fail"
  result?: IPostItem
}

export interface IDeletePostRes {
  status: "success" | "fail"
  result?: IPostItem
}

export interface IGetArticleItemsRequestAction {
  type: typeof GET_ARTICLE_REQUEST
}
export interface IGetArticleItemsSuccessAction {
  type: typeof GET_ARTICLE_SUCCESS
  items: IPostItem[]
}
export interface IGetArticleItemsFailAction {
  type: typeof GET_ARTICLE_FAIL
  error: string | null
}
export interface IAddArticleItemsRequestAction {
  type: typeof ADD_ARTICLE_REQUEST
}
export interface IAddArticleItemsSuccessAction {
  type: typeof ADD_ARTICLE_SUCCESS
  items: IPostItem
}
export interface IAddArticleItemsFailAction {
  type: typeof ADD_ARTICLE_FAIL
  error: string | null
}
export interface IUpdateArticleItemsRequestAction {
  type: typeof UPDATE_ARTICLE_REQUEST
}
export interface IUpdateArticleItemsSuccesAction {
  type: typeof UPDATE_ARTICLE_SUCCESS
  items: IPostItem
}
export interface IUpdateArticleItemsFailAction {
  type: typeof UPDATE_ARTICLE_FAIL
  error: string|null
}
export interface IDeleteArticleItemsRequestAction {
  type: typeof DELETE_ARTICLE_REQUEST
}
export interface IDeleteArticleItemsSuccessAction {
  type: typeof DELETE_ARTICLE_SUCCESS
  itemId: number
}
export interface IDeleteArticleItemsFailAction {
  type: typeof DELETE_ARTICLE_FAIL
  error: string | null
}

export type IArticleItemState = {
  status: string,
  error: string | null,
  data: IPostItem[]
}