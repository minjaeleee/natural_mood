import { Fragment, useEffect } from 'react'
import { Action } from 'redux'
import { useSelector,useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { useSnackbar } from 'notistack'

import { Login } from './Auth/Login'
import { MainLogin } from './Auth/MainLogin'
import { SignUp } from './Auth/SignUp'
import { RootState } from '../store/modules'
import { useRouter } from '../useHook/useRouter'
import { getAutoLoginAuth } from '../store/modules/auth'
import { AUTH_MESSAGE } from '../common/snackbarMessages'

import styles from './Home.module.scss'

const homeAuthData = [
  {
    path: '/',
    element: <MainLogin/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/sign-up',
    element: <SignUp/>
  },
]

export const Home = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, Action>>()
  const { routeTo, currentPath } = useRouter()
  const auth = useSelector((state:RootState)=>state.auth)
  const { enqueueSnackbar } = useSnackbar()
  
  useEffect(()=>{
    (async()=>{
      if(auth.data.accessToken) {
        dispatch(getAutoLoginAuth({id: auth.data.id, accessToken: auth.data.accessToken }))
          .then(()=> {
            enqueueSnackbar(AUTH_MESSAGE.AUTO_LOGIN_SUCCESS)
            routeTo('/beverage/all')
            }
          )
      }
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currentPath])

  return (
    <div className={styles.wrapper}>
      <section className={styles.loginFormat}>
        {
          homeAuthData.map((data,idx) =>
            <Fragment key={data.path + idx}>
              {currentPath === data.path  && data.element}
            </Fragment>
          )
        }
      </section>
    </div>
  )
}
