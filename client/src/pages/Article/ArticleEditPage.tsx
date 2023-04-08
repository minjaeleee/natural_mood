import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { EditItem } from './EditItem'
import { getPost, updatePost } from '../../api/articleAPI'
import { IPostItem } from '../../types/article'
import { RootState } from '../../store/modules'
import { useRouter } from '../../useHook/useRouter'

export const ArticleEditPage = () => {
  const {id} = useParams()
  const { routeTo } = useRouter()
  const auth = useSelector((state:RootState) => state.auth)
  const [articleItems, setArticleItems] = useState({} as IPostItem)

  const getDetailPost = useCallback(async()=>{
    const data =  await getPost(parseInt(id))
    if(data.status === "fail") return alert("글을 읽어오지 못했습니다.")
    setArticleItems(prev => data.result)
  },[id])

  const fetchData = async(args: IPostItem) => {
    if(Object.keys(articleItems).length > 0) {
     const getUpdatePost = await updatePost(args, parseInt(id))
     if(getUpdatePost.status === "fail") return alert("다시 시도해주세요.")
     return window.location.href = "/article"
    }
  }

  useEffect(()=>{
    getDetailPost()
  },[getDetailPost])

  useEffect(()=>{
    if(!auth.isAdmin) {
      routeTo('/article')
    }
  },[auth, routeTo])

  return (
    Object.keys(articleItems).length > 0 && 
    <EditItem articleItems={articleItems} fetchData={fetchData} headerTitle={"아티클 글 수정하기"}/> 
  )
}
