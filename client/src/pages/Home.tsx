

import { Fragment } from 'react'
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
  const {currentPath} = useRouter()

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
