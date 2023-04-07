import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'

import { createPost } from '../../api/articleAPI'
import { RootState } from '../../store/modules'
import { IPostItem } from '../../types/article'
import { Editor } from './Editor'
import { ThumbnailChoiceModal } from './ThumbnailChoiceModal'

import styles from './ArticleCreatePage.module.scss'
import { useRouter } from '../../useHook/useRouter'

export const ArticleCreatePage = () => {
  const auth = useSelector((state:RootState) => state.auth)
  const { routeTo } = useRouter()
  const [edit, setEdit] = useState<string>('')
  const [titleInput, setTitleInput] = useState<string>('')
  const [selectedThumbnail, setselectedThumbnail] = useState<string>('')
  const [isClickThumbnail, setIsClickThumbnail] = useState<boolean>(false)

  const onSubmit = useCallback(async()=>{
    const onlyTextContent = edit.replace(/<[/\w\s"=-]*>/gi, "")
    if(onlyTextContent.length === 0) {
      alert('메모가 비어있있습니다.')
      return;
    } else {
      if(titleInput === '') return alert('제목을 작성해주세요.')
      if(selectedThumbnail === '') {
        if(!window.confirm("썸네일을 선택하지 않으시겠습니까?")) {
          return;
        } 
      }
      const createPostApiReq: IPostItem = {
        image: selectedThumbnail || "https://www.k-startup.go.kr//images/homepage/prototype/noimage.gif",
        title:  titleInput,
        author: auth.email,
        content: edit,
        created_at: Date.now()
      }

      await createPost(createPostApiReq)
      setEdit('')
      setTitleInput('')
      setselectedThumbnail('')
    }
  },[auth.email, edit, selectedThumbnail, titleInput])

  return (
    <div className={styles.wrapper}>
    <header className={styles.header}>
      <h1 className={styles.title}>
        블로그 글 생성하기
      </h1>
    </header>
    <main className={styles.main}>
      <input
        className={styles.titleInput}
        type={"text"}
        value={titleInput}
        onChange={(e)=>setTitleInput(e.target.value)}
        placeholder={"블로그 제목을 입력해주세요."}
      />
      <div 
        className={selectedThumbnail === "" ? styles.plusBtn: styles.none} 
        onClick={()=>{setIsClickThumbnail(!isClickThumbnail)}}
      >
        <p> 썸네일 사진을 선택해주세요.</p>
      </div>
      {
        isClickThumbnail && <ThumbnailChoiceModal setIsOpen={setIsClickThumbnail} setselectedThumbnail={setselectedThumbnail}/>
      }
      {
        selectedThumbnail !== '' && 
        <div 
          className={styles.thumbnailBox}
          onClick={()=>{setIsClickThumbnail(!isClickThumbnail)}}
        >
          <img className={styles.thumbnail} src={selectedThumbnail} alt={"thumbnail_img"}></img>
        </div>
      }
      <div className={styles.editorBox}>
        <Editor 
          style={{height: "650px"}}
          value={edit} 
          onChange={setEdit}
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
