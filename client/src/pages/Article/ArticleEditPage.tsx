import React, { useCallback, useEffect, useState } from 'react'
import { EditItem } from './EditItem'
import { getAllPosts, getPost, updatePost } from '../../api/articleAPI'
import { useParams } from 'react-router-dom'
import { IPostItem } from '../../types/article'

export const ArticleEditPage = () => {
  const {id} = useParams()
  const [articleItems, setArticleItems] = useState<IPostItem | {}>({})

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

  return (
    Object.keys(articleItems).length > 0 && 
    <EditItem articleItems={articleItems} fetchData={fetchData}/> 
  )
}
