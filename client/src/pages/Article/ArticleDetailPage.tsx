import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { deletePost, getPost } from '../../api/articleAPI'
import { IPostItem } from '../../types/article'
import { useRouter } from '../../useHook/useRouter'
import { RootState } from '../../store/modules'

import styles from './ArticleDetailPage.module.scss'

export const ArticleDetailPage = () => {
  const auth = useSelector((state:RootState) => state.auth)
  const {id} = useParams()
  const { routeTo } = useRouter()
  const [data, setData] = useState({} as IPostItem)

  const fetchData = useCallback(async()=>{
    const getPostData = await getPost(parseInt(id))
    if(getPostData.status === "fail") return routeTo("/article")
    setData(prev => getPostData.result)
  },[id, routeTo])

  useEffect(()=>{
    fetchData()
  },[fetchData])

  const deleteArticle = async() => {
    const result = await deletePost(parseInt(id))
    if(result.status === "fail") return alert("글이 삭제되지 못했습니다.")
    if(window.confirm("정말 삭제하시겠습니까?")) {
      alert("글이 삭제되었습니다.")
      return window.location.href = "/article"
    } else {
      return;
    }
  }

  return (
    Object.keys(data).length> 0 &&
    <div>
      <header className={styles.header}>
        <h1>
          {data.title}
        </h1>
      </header>
      <aside className={styles.information}>
        <span className={styles.author}>{`Natural Mood | ${new Date(data.created_at).toLocaleDateString()}`}</span>
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
          dangerouslySetInnerHTML={{__html: data.content}}
        >
        </div>
      </main>
    </div>
  )
}