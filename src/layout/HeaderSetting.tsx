import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import { RootState } from '../store/modules'
import { logout } from '../store/modules/auth'
import { useRouter } from '../useHook/useRouter'

import styles from './HeaderSetting.module.scss'

export const HeaderSetting = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state:RootState) => state.auth)
  const { routeTo } = useRouter()

  const onClickLogout = () => {
    dispatch(logout())
    routeTo('/')
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainInfo}>
        <h3 className={styles.grade}>
          {
            auth.isAdmin ? "관리자" : "일반 회원"
          }
        </h3>
        <div className={styles.email}>
          {auth.email}
        </div>
      </div>
      <div className={styles.logout}>
        <button 
          className={styles.logoutBtn}
          onClick={onClickLogout}
          >로그 아웃</button>
      </div>
    </div>
  )
}
