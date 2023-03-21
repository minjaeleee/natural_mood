import { Header } from './Header'

import styles from './Layout.module.scss'
import { SideBar } from './SideBar'

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
            {children}
          </div>
        </>
      }
      </main>

    </div>
  )
}
