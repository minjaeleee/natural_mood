import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPost } from '../../api/articleAPI'
import { IPostItem } from '../../types/article'

export const ArticleDetailPage = () => {
  const {id} = useParams()
  const [data, setData] = useState<IPostItem | {}>({})

  const fetchData = useCallback(async()=>{
    const getPostData = await getPost(parseInt(id))
    if(getPostData.status === "fail") throw new Error('값을 읽어오지 못했습니다.')
    setData(prev => getPostData.result)
  },[])


  useEffect(()=>{
    fetchData()
  },[fetchData])

  return (
    <div>
      <h1>
      {"title" in data && data.title}
      </h1>
    </div>
  )
}