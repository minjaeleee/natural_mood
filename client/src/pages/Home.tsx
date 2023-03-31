import { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { authLogin } from '../api/loginAPI'
import { RootState } from '../store/modules'
import { useRouter } from '../useHook/useRouter'
import { Login } from './Auth/Login'
import { MainLogin } from './Auth/MainLogin'
import { SignUp } from './Auth/SignUp'

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
  const { routeTo, currentPath } = useRouter()
  const data = useSelector((state:RootState)=>state.auth)

  useEffect(()=>{
    (async()=>{
      if(data.accessToken) {
        const getTokenValid = await authLogin({id: data.id, accessToken:data.accessToken })
        if(getTokenValid === "success") {
          routeTo('/beverage/all')
          alert('자동 로그인이 되었습니다. 계정 변경을 원하시면 우측 상단 로그아웃 버튼을 클릭해주세요.')
        }
      }
    })()
  },[])

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
