import { useCallback, useEffect, useState } from "react"

import { getAllPosts } from "../api/articleAPI"
import { IPostItem } from "../types/article"
import { useRouter } from "../useHook/useRouter"

import styles from './Article.module.scss'

export const Article = () => {
  const [data, setData] = useState<IPostItem[] | []>([])
  const { currentPath, routeTo } = useRouter()

  const fetchData = useCallback(async()=>{
    const getPostData = await getAllPosts()
    if(getPostData.status === "fail") throw new Error('값을 읽어오지 못했습니다.')
    setData(prev => [...getPostData.result])
  },[])

  useEffect(()=>{
    fetchData()
  },[fetchData])

  return (
    currentPath === '/article' &&
    <div>
      <header className={styles.header}>
        <h1>
          블로그
        </h1>
        <button onClick={()=> routeTo(`/article/post`)}>글 추가하기</button>
      </header>
      <section className={styles.postWrapper}>
        {
          data.map(list => {
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
                    // onError={handleErrorImg}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className={styles.descBox}>
                  <h2>{list.title}</h2>
                  <h3>{list.content}</h3>
                </div>
                <div className={styles.authorBox}>
                  <span>{list.author}</span>
                  <span>날짜 표기</span>
                </div>
              </div>
            )
          })
        }
      </section>
    </div>
  )
}
