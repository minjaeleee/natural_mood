import { useRouter } from "../useHook/useRouter"

import styles from './Header.module.scss'

export const Header = () => {
  const{ routeTo } = useRouter()

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <h1 className={styles.title} onClick={()=>routeTo('/')}>
          Natural Mood
        </h1>
        <div className={styles.headerImgs}>
          <p>img1</p>
          <p>img2</p>
          <p>img3</p>
        </div>
      </div>
    </header>
  )
}
