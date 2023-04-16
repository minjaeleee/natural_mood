import { Action } from 'redux';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { useSnackbar } from 'notistack';

import { useRouter } from '../../useHook/useRouter'
import { RootState } from '../../store/modules';
import { getLoginAuth } from '../../store/modules/auth';
import { AUTH_MESSAGE } from '../../common/snackbarMessages';

import styles from './MainLogin.module.scss';

const ADMIN_ACCOUNT = {
  "email": "mood_employee13215@gmail.com",
  "password": "mood13215",
  "isAdmin": true
}

export const MainLogin = () => {
  const {routeTo} = useRouter()
  const dispatch = useDispatch<ThunkDispatch<RootState, void, Action>>();
  const { enqueueSnackbar } = useSnackbar()

  const directAdminLogin = async() => {
    dispatch(getLoginAuth(ADMIN_ACCOUNT))
      .then(()=> {
        enqueueSnackbar(AUTH_MESSAGE.ADMIN_LOGIN_SUCCESS)
        routeTo("/beverage/all")
      })
      .catch(()=> enqueueSnackbar(AUTH_MESSAGE.ADMIN_LOGIN_FAILURE))
  }

  return (
    <>
      <h3 className={styles.mainTitle}> 회원가입 또는 로그인을 해주세요.</h3>
      <div className={styles.title}>
        <button className={styles.btn} onClick={directAdminLogin}>회원가입 없이 관리자 로그인</button>
      </div>
      <div className={styles.title}>
        <button className={styles.btn} onClick={()=>routeTo("login")}>로그인</button>
      </div>
      <div className={styles.title}>
        <button className={styles.btn} onClick={()=>routeTo("sign-up")}>회원가입</button>
      </div>
    </>
  )
}
