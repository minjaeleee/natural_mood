import { Header } from './Header'

import styles from './Layout.module.scss'

interface ILayout {
  children: React.ReactNode,
  isNavBar: boolean
}

export const Layout: React.FC<ILayout> = ({children, isNavBar}) => {

  return (
    <div className={styles.layout}>
      <Header/>
      { 
        isNavBar &&
        <div className={styles.content}>
          {children}
        </div>
      }
    </div>
  )
}
