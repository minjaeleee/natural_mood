import { useRouter } from "../useHook/useRouter"
import { MdWineBar } from 'react-icons/md'

import styles from './Header.module.scss'

export const Header = () => {
  const{ routeTo } = useRouter()

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <MdWineBar className={styles.icon}/>
        <h1 className={styles.title} onClick={()=>routeTo('/')}>
          Natural Mood
        </h1>
      </div>
    </header>
  )
}
