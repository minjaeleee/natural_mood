import { createPost } from '../../api/articleAPI'
import { IPostItem } from '../../types/article'

import { EditItem } from './EditItem'

const articleItems: IPostItem = {
  image: "",
  title: "",
  author: "",
  content: "",
  created_at: 0,
}

export const ArticleCreatePage = () => {
  const fetchData = async(args: IPostItem) => {
    const getCreatedPost = await createPost(args)
    if(getCreatedPost.status === "fail") return alert("다시 시도해주세요.")
    return window.location.href = "/article"
  }

  return (
    <>
      <EditItem 
        articleItems={articleItems}
        fetchData={fetchData}
      />
    </>
  )
}
