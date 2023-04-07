import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { IPostItem } from '../../types/article'
import { RootState } from '../../store/modules'
import { useRouter } from '../../useHook/useRouter'
import { ThumbnailChoiceModal } from './ThumbnailChoiceModal'
import { Editor } from './Editor'

import styles from './EditItem.module.scss'

export const EditItem = ({
    articleItems,
    fetchData,
    headerTitle
}) => {
  const auth = useSelector((state:RootState) => state.auth)
  const { routeTo } = useRouter()
  
  const [items, setItems] = useState(articleItems)
  const [isClickThumbnail, setIsClickThumbnail] = useState<boolean>(false)

  const { image, title, content } = items

  const onSubmit = useCallback(async()=>{
    const onlyTextContent = content.replace(/<[/\w\s"=-]*>/gi, "")
    if(onlyTextContent.length === 0) {
      alert('메모가 비어있있습니다.')
      return;
    } else {
      if(title === '') return alert('제목을 작성해주세요.')
      if(image === '') {
        if(!window.confirm("썸네일을 선택하지 않으시겠습니까?")) {
          return;
        } 
      }
      await fetchData(items)
    }
  },[content, fetchData, image, items, title])

  useEffect(()=>{
    if(items.created_at === 0) {
      setItems((prev:IPostItem) => ({
        ...prev,
        image: image === "" ? image : "https://www.k-startup.go.kr//images/homepage/prototype/noimage.gif",
        author: auth.email,
        created_at: Date.now()
      }))
    }
  },[auth.email, image, items])
  
  const onChangeTitle = useCallback((e)=>{
    setItems((prev:IPostItem) => ({...prev, title:e.target.value}))
  },[])
  
  const onChangeContent = useCallback((value:string)=>{
    setItems((prev:IPostItem)=> ({...prev, content: value}))
  },[])

  return (
    <div className={styles.wrapper}>
    <header className={styles.header}>
      <h1 className={styles.title}>
        {headerTitle}
      </h1>
    </header>
    <main className={styles.main}>
      <input
        className={styles.titleInput}
        type={"text"}
        value={title}
        onChange={onChangeTitle}
        placeholder={"블로그 제목을 입력해주세요."}
      />
      <div 
        className={image === "" ? styles.plusBtn: styles.none} 
        onClick={()=>{setIsClickThumbnail(!isClickThumbnail)}}
      >
        <p> 썸네일 사진을 선택해주세요.</p>
      </div>
      {
        isClickThumbnail && <ThumbnailChoiceModal setIsOpen={setIsClickThumbnail} setselectedThumbnail={(value)=>setItems(prev => ({...prev, image: value}))}/>
      }
      {
        image !== '' && 
        <div 
          className={styles.thumbnailBox}
          onClick={()=>{setIsClickThumbnail(!isClickThumbnail)}}
        >
          <img className={styles.thumbnail} src={image} alt={"thumbnail_img"}></img>
        </div>
      }
      <div className={styles.editorBox}>
        <Editor
          style={{height: "650px"}}
          value={content} 
          onChange={onChangeContent}
        />
      </div>
      <div className={styles.buttonBox}>
        <button className={styles.cancelBtn} onClick={()=>routeTo("/article")}>
          취소하기
        </button>
        <button className={styles.submitBtn} onClick={onSubmit}>
          글 생성하기
        </button>
      </div>
    </main>
  </div>
  )
}
