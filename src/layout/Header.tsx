import { NavBar } from "./NavBar"
import { useRouter } from "../useHook/useRouter"

import styles from './Header.module.scss'

export const Header = () => {
  const{routeTo} = useRouter()

  return (
    <div className={styles.header}>
      <div className={styles.headerTitle}>
        <p className={styles.title} onClick={()=>routeTo('/')}>
          Natural Mood
        </p>
      </div>
      <NavBar/>
    </div>
  )
}
