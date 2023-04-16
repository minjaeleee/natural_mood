import { useEffect } from 'react'
import { Action } from 'redux'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { useSnackbar } from 'notistack'

import { EditItem } from './EditItem'
import { IPostItem } from '../../types/article'
import { RootState } from '../../store/modules'
import { useRouter } from '../../useHook/useRouter'
import { addArticleItem } from '../../store/modules/article'
import { ARTICLE_MESSAGE } from '../../common/snackbarMessages'

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
  const dispatch = useDispatch<ThunkDispatch<RootState, void, Action>>();
  const { enqueueSnackbar } = useSnackbar();

  const fetchData = async(args: IPostItem) => {
    dispatch(addArticleItem(args))
      .then(()=>enqueueSnackbar(ARTICLE_MESSAGE.ADDED_ARTICLE_ITEM_SUCCESS))
      .catch(()=>enqueueSnackbar(ARTICLE_MESSAGE.ADDED_ARTICLE_ITEM_FAILURE))
    routeTo('/article')
  }

  useEffect(()=>{
    if(!auth.isAdmin) {
      routeTo('/article')
    }
  },[auth, routeTo])

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
