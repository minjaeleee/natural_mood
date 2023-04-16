import { useEffect, useState } from "react"
import { Action } from 'redux';
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { ThunkDispatch } from "redux-thunk"
import DOMPurify from "dompurify"

import { DefaultPage } from "./Article/DefaultPage"
import { IArticleItemState, IPostItem } from "../types/article"
import { useRouter } from "../useHook/useRouter"
import { RootState } from "../store/modules"
import { getArticleItems } from "../store/modules/article"

import styles from './Article.module.scss'

export const Article = () => {
  const auth = useSelector((state:RootState) => state.auth)
  const articleState = useSelector((state:RootState) => state.aritlce)
  const dispatch = useDispatch<ThunkDispatch<RootState, void, Action>>();
  const sanitizer = DOMPurify.sanitize
  const { currentPath, routeTo } = useRouter()
  const [data, setData] = useState({} as IArticleItemState)
  
  useEffect(()=>{
    currentPath === '/article' && dispatch(getArticleItems())
  },[currentPath, dispatch])

  useEffect(()=>{
    currentPath === '/article' && setData(prev => ({...articleState}))
  },[currentPath, dispatch, articleState])

  const handleErrorImg = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://www.k-startup.go.kr//images/homepage/prototype/noimage.gif"
  }

  return (
    currentPath === '/article' &&
    <div>
      <header className={styles.header}>
        <h1>
          전체 아티클
        </h1>
        {
          auth.isAdmin &&
          <div className={styles.addArticle}>
            <button 
              className={styles.addArticleBtn}
              onClick={()=> routeTo(`/article/post`)}
              >
              글 추가하기
            </button>
          </div>
        }
      </header>
      <section className={styles.postWrapper}>
        {
          data.data?.length > 0
          ? data.data.map((list:IPostItem) => {
            const summaryFirst = list.content.split("/")[0] + "/" + list.content.split(">")[0] + ">"
            return (
              <div 
                key={list.id+list.title} 
                className={styles.list}
                onClick={()=> routeTo(`/article/${list.id}`)}
              >
                <div className={styles.imgBox}>
                  <img 
                    src={list.image}  
                    alt={list.title}
                    className={styles.img}
                    onError={handleErrorImg}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className={styles.articleInformation}>
                  <div className={styles.descBox}>
                    <div className={styles.title}>
                      <h2>
                        {list.title}
                      </h2>
                    </div>
                    <div
                      className={styles.content}
                      dangerouslySetInnerHTML={{__html:sanitizer(summaryFirst)}}
                    >
                    </div>
                  </div>
                  <div className={styles.authorBox}>
                    <p className={styles.author}>
                      Natural Mood | {new Date(list.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            )
          })
          :  <DefaultPage/>
        }
      </section>
    </div>
  )
}
