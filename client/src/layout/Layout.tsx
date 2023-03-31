import { Header } from './Header'
import { SideBar } from './sidebar/SideBar'

import styles from './Layout.module.scss'
import { Outlet } from 'react-router-dom'

interface ILayout {
  children: React.ReactNode
}

export const Layout: React.FC<ILayout> = ({children}) => {
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
