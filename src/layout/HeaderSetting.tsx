import { Action } from 'redux';
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk';
import { useSnackbar } from 'notistack';

import { RootState } from '../store/modules'
import { useRouter } from '../useHook/useRouter'
import { getLogoutAuth } from '../store/modules/auth';
import { AUTH_MESSAGE } from '../common/snackbarMessages';

import styles from './HeaderSetting.module.scss'

export const HeaderSetting = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, Action>>();
  const auth = useSelector((state:RootState) => state.auth)
  const { routeTo } = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  const onClickLogout = () => {
    dispatch(getLogoutAuth())
      .then(()=> enqueueSnackbar(AUTH_MESSAGE.LOGOUT_SUCCESS))
    routeTo('/')
  }

  return (
    auth.status === "SUCCESS" &&
    <div className={styles.wrapper}>
      <div className={styles.mainInfo}>
        <h3 className={styles.grade}>
          {
            auth.data.isAdmin ? "관리자" : "일반 회원"
          }
        </h3>
        <div className={styles.email}>
          {auth.data.email}
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
