import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../api/loginAPI'
import { getAuth } from '../../store/modules/auth'
import { IFormData, ILoginReq } from '../../types/login'
import { useRouter } from '../../useHook/useRouter'
import { FormInput } from './FormInput'

import styles from './Login.module.scss'

const initialFormData: IFormData = {
  id: '',
  pw: '',
}

export const Login = () => {
  const { routeTo } = useRouter()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState<IFormData>(initialFormData)

  const onSubmit = async(e) => {
    e.preventDefault()
    const loginReq: ILoginReq = {
      "email": formData.id,
      "password": formData.pw
    }
    const loginResult = await login(loginReq)
    if(loginResult.result === "fail") return alert('로그인 또는 비밀번호가 유효하지 않습니다.')
    dispatch(getAuth(loginResult.userInfo))
    routeTo('/beverage/all')
  }

  return (
    <>
      <form className={styles.wrapper}>
      <h1 className={styles.title}>로그인</h1>
        <FormInput
          id={"id"}
          label={"아이디"}
          formData={formData}
          setFormData={setFormData}
          inputProps={{
            type: "text",
            placeholder: "아이디를 입력해 주세요.",
            autoFocus: true
          }}
        />
        <FormInput
          id={"pw"}
          label={"패스워드"}
          formData={formData}
          setFormData={setFormData}
          inputProps={{
            type: "password",
            placeholder: "비밀번호 입력해 주세요.",
          }}
        />
        <input 
          className={styles.submitBtn}
          type="submit" 
          value="로그인 하기" 
          onClick={(e)=> onSubmit(e)}
        />
      </form>
    </>
  )
}
