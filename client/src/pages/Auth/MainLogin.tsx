import React from 'react'
import { useDispatch } from 'react-redux';
import { login } from '../../api/loginAPI';
import { getAuth } from '../../store/modules/auth';
import { useRouter } from '../../useHook/useRouter'

import styles from './MainLogin.module.scss';

const adminAccount = {
  "email": "mood_employee13215@gmail.com",
  "password": "mood13215",
  "isAdmin": true
}

export const MainLogin = () => {
  const {routeTo} = useRouter()
  const dispatch = useDispatch()

  const directAdminLogin = async() => {
    const loginResult = await login(adminAccount)
    if(loginResult.result === "fail") return alert("다시 시도해주세요.")
    alert("관리자 권한으로 로그인 하였습니다.")
    dispatch(getAuth(loginResult.userInfo))
    routeTo("/beverage/all")
  }

  return (
    <>
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
