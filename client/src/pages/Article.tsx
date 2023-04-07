import { useCallback, useEffect, useState } from "react"

import { getAllPosts } from "../api/articleAPI"
import { IPostItem } from "../types/article"
import { useRouter } from "../useHook/useRouter"
import { useSelector } from "react-redux"
import { RootState } from "../store/modules"

import styles from './Article.module.scss'

export const Article = () => {
  const auth = useSelector((state:RootState) => state.auth)
  const { currentPath, routeTo } = useRouter()
  const [data, setData] = useState<IPostItem[] | []>([])

  const fetchData = useCallback(async()=>{
    const getPostData = await getAllPosts()
    if(getPostData.status === "fail") throw new Error('값을 읽어오지 못했습니다.')
    setData(prev => [...getPostData.result])
  },[])

  useEffect(()=>{
    fetchData()
  },[fetchData])

  const handleErrorImg = (e) => {
    e.target.src = "https://www.k-startup.go.kr//images/homepage/prototype/noimage.gif"
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
          data.map((list:IPostItem) => {
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
                      dangerouslySetInnerHTML={{__html:summaryFirst}}
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
        }
      </section>
    </div>
  )
}
