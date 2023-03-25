import { Header } from './Header'
import { SideBar } from './sidebar/SideBar'

import styles from './Layout.module.scss'
import { Outlet } from 'react-router-dom'

interface ILayout {
  children: React.ReactNode,
  isSideBar: boolean
}

export const Layout: React.FC<ILayout> = ({children, isSideBar}) => {
  return (
    <div className={styles.layout}>
      <Header/>
      <main className={styles.main}>
        { 
          isSideBar &&
          <>
            <SideBar/>
            <div className={styles.content}>
              <Outlet/>
              {children}
            </div>
          </>
        }
      </main>
    </div>
  )
}