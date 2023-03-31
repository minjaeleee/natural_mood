import React from 'react'
import { useRouter } from '../../useHook/useRouter'

import styles from './MainLogin.module.scss';

export const MainLogin = () => {
  const {routeTo} = useRouter()
  return (
    <>
      <div className={styles.title}>
        <button className={styles.btn}>회원가입 없이 관리자 로그인</button>
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
