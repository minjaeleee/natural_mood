import React, { useCallback, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { createPost } from '../../api/articleAPI'
import { RootState } from '../../store/modules'
import { IPostItem } from '../../types/article'
import { Editor } from './Editor'

import styles from './ArticleCreatePage.module.scss'
import { thumbnailData } from './thumbnailData'
import { ThumbnailChoiceModal } from './ThumbnailChoiceModal'

export const ArticleCreatePage = () => {
  const [edit, setEdit] = useState<string>('')
  const [titleInput, setTitleInput] = useState<string>('')
  const [selectedThumbnail, setselectedThumbnail] = useState<string>('')
  const [isClickThumbnail, setIsClickThumbnail] = useState<boolean>(false)
  const auth = useSelector((state:RootState) => state.auth)
  const [imaegList, setImageList] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const onSubmit = useCallback(async()=>{
    const onlyTextContent = edit.replace(/<[/\w\s"=-]*>/gi, "")
    if(onlyTextContent.length === 0) {
      alert('메모가 비어있있습니다.')
      return;
    } else {
      if(titleInput === '') return alert('제목을 작성해주세요.')
      if(selectedThumbnail === '') return alert('썸네일을 선택해주세요.')
      const createPostApiReq: IPostItem = {
        image: selectedThumbnail,
        title:  titleInput,
        author: auth.email,
        content: edit,
        created_at: Date.now()
      }
      await createPost(createPostApiReq)
      setEdit('')
      setTitleInput('')
    }
  },[auth.email, edit, selectedThumbnail, titleInput])

  console.log("imaegList",imaegList)

  return (
    <div className={styles.wrapper}>
    <header className={styles.header}>
      <h1 className={styles.title}>
        블로그 글 생성하기
      </h1>
    </header>
    <main className={styles.main}>
      <input
        value={titleInput}
        onChange={(e)=>setTitleInput(e.target.value)}
        placeholder={"블로그 제목을 입력해주세요."}
      />
      <div className={selectedThumbnail === "" ? styles.plusBtn: styles.none} onClick={()=>{setIsClickThumbnail(!isClickThumbnail)}}>
        +
      </div>
      {
        isClickThumbnail && <ThumbnailChoiceModal setIsOpen={setIsClickThumbnail} setselectedThumbnail={setselectedThumbnail}/>
      }
      {
        selectedThumbnail !== '' && <img className={styles.thumbnail} src={selectedThumbnail} alt={"thumbnail_img"}></img>
      }
      <Editor 
        value={edit} 
        onChange={setEdit}
      />
      <div className={styles.btnWrapper}>
        <button className={styles.submitBtn} onClick={onSubmit}>
          글 생성하기
        </button>
      </div>
    </main>
  </div>
  )
}
