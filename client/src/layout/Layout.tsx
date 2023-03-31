import { Header } from './Header'
import { SideBar } from './sidebar/SideBar'

import { Outlet } from 'react-router-dom'

import styles from './Layout.module.scss'

interface ILayout {
  children: React.ReactNode,
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
