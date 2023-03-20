import styles from './Layout.module.scss'

interface ILayout {
  children: React.ReactNode
}

export const Layout: React.FC<ILayout> = ({children}) => {
  return (
    <div className={styles.layout}>
      {children}
    </div>
  )
}
