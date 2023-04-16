import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

import { Header } from './Header'
import { SideBar } from './sidebar/SideBar'
import { RootState } from '../store/modules'
import { useRouter } from '../useHook/useRouter'

import styles from './Layout.module.scss'

interface IProps {
  children: React.ReactNode
}

export const Layout = ({children}: IProps) => {
  const auth = useSelector((state:RootState) => state.auth)
  const { routeTo } = useRouter()

  useEffect(()=>{
    if(!auth.email) return routeTo('/')
  },[auth.email, routeTo])

  return (
    <div className={styles.layout}>
      <Header/>
      <main className={styles.main}>
        <SideBar/>
        <div className={styles.content}>
          {children}
          <Outlet/>
        </div>
      </main>
    </div>
  )
}
