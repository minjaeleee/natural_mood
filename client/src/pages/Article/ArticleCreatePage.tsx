import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { EditItem } from './EditItem'
import { createPost } from '../../api/articleAPI'
import { IPostItem } from '../../types/article'
import { RootState } from '../../store/modules'
import { useRouter } from '../../useHook/useRouter'

const articleItems: IPostItem = {
  image: "",
  title: "",
  author: "",
  content: "",
  created_at: 0,
}

export const ArticleCreatePage = () => {
  const auth = useSelector((state:RootState) => state.auth)
  const { routeTo } = useRouter()

  const fetchData = async(args: IPostItem) => {
    const getCreatedPost = await createPost(args)
    if(getCreatedPost.status === "fail") return alert("다시 시도해주세요.")
    return window.location.href = "/article"
  }

  useEffect(()=>{
    console.log("auth",auth)
    if(!auth.isAdmin) {
      routeTo('/article')
    }
  },[auth])

  return (
    <>
      <EditItem 
        articleItems={articleItems}
        fetchData={fetchData}
        headerTitle={"아티클 글 생성하기"}
      />
    </>
  )
}
