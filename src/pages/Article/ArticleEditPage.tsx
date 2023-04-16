import React, { useEffect, useState } from 'react'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import { EditItem } from './EditItem'
import { IArticleItemState, IPostItem } from '../../types/article'
import { RootState } from '../../store/modules'
import { useRouter } from '../../useHook/useRouter'
import { getArticleItems, updateArticleItem } from '../../store/modules/article'
import { ARTICLE_MESSAGE } from '../../common/snackbarMessages'

export const ArticleEditPage = () => {
  const { id } = useParams()
  const { routeTo } = useRouter()
  const article = useSelector((state:RootState) => state.aritlce)
  const auth = useSelector((state:RootState) => state.auth)
  const dispatch = useDispatch<ThunkDispatch<RootState, void, Action>>();
  const { enqueueSnackbar } = useSnackbar();

  const [articleItems, setArticleItems] = useState({} as IArticleItemState)

  const fetchData = async(args: IPostItem) => {
    dispatch(updateArticleItem(args, parseInt(id)))
      .then(()=>enqueueSnackbar(ARTICLE_MESSAGE.UPDATED_ARTICLE_ITEM_SUCCESS))
      .catch(()=>enqueueSnackbar(ARTICLE_MESSAGE.UPDATED_ARTICLE_ITEM_FAILURE))
    routeTo('/article')
  }

  useEffect(()=>{
    article.status === "IDLE" && dispatch(getArticleItems(parseInt(id)))
  },[article.status, dispatch, id])

  useEffect(()=>{
    article.status !== "IDLE" && setArticleItems(prev => ({...article}))
  },[article, dispatch, id])

  useEffect(()=>{
    if(!auth.isAdmin) {
      routeTo('/article')
    }
  },[auth, routeTo])
  
  return (
    articleItems.status !== "IDLE" && articleItems.data?.length > 0 &&
    <EditItem articleItems={articleItems.data[0]} fetchData={fetchData} headerTitle={"아티클 글 수정하기"}/> 
  )
}
