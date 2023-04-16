import React, { useEffect, useState } from 'react'
import { Action } from 'redux'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import DOMPurify from 'dompurify'
import { useSnackbar } from 'notistack'

import { IArticleItemState } from '../../types/article'
import { useRouter } from '../../useHook/useRouter'
import { RootState } from '../../store/modules'
import { deleteArticleItem, getArticleItems } from '../../store/modules/article'
import { ARTICLE_MESSAGE } from '../../common/snackbarMessages'

import styles from './ArticleDetailPage.module.scss'

export const ArticleDetailPage = () => {
  const sanitizer = DOMPurify.sanitize
  const dispatch = useDispatch<ThunkDispatch<RootState, void, Action>>();
  const { id } = useParams()
  const { routeTo } = useRouter()
  const { enqueueSnackbar } = useSnackbar();
  const auth = useSelector((state:RootState) => state.auth)
  const articleState = useSelector((state:RootState) => state.aritlce)

  const [data, setData] = useState({} as IArticleItemState)

  useEffect(()=>{
    dispatch(getArticleItems(parseInt(id)))
  },[dispatch, id])

  useEffect(()=>{
    setData(prev => ({...articleState}))
  },[articleState])

  const deleteArticle = async() => {
    dispatch(deleteArticleItem(parseInt(id)))
      .then(()=>enqueueSnackbar(ARTICLE_MESSAGE.DELETED_ARTICLE_ITEM_SUCCESS))
      .catch(()=>enqueueSnackbar(ARTICLE_MESSAGE.DELETED_ARTICLE_ITEM_FAILURE))
    routeTo('/article')
  }

  const getArticleItem = data.data?.length > 0 && data.data[0]
  return (
    data.data?.length > 0 &&
    <div>
      <header className={styles.header}>
        <h1>
          {getArticleItem.title}
        </h1>
      </header>
      <aside className={styles.information}>
        <span className={styles.author}>{`Natural Mood | ${new Date(getArticleItem.created_at).toLocaleDateString()}`}</span>
        {
          auth.isAdmin &&
          <div className={styles.editBtnBox}>
            <button 
              onClick={()=>routeTo('edit')}
            >
              글 수정하기
            </button>
            <button
              onClick={deleteArticle}
            >
              글 삭제하기
            </button>
          </div>
        }
      </aside>
      <main className={styles.contentWrapper}>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{__html: sanitizer(getArticleItem.content)}}
        >
        </div>
      </main>
    </div>
  )
}