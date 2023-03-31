import React, { useState } from 'react'
import { signUp } from '../../api/loginAPI'
import { IformData, ISignUpArgs } from '../../types/login'
import { useRouter } from '../../useHook/useRouter'
import { FormInput } from './FormInput'

import styles from './SignUp.module.scss'

const initialFormData = {
  id: '',
  pw: '',
  confirmPw: ''
}

const initialErrorData = {
  id: '',
  pw: '',
  confirmPw: ''
}

export const SignUp = () => {
  const { routeTo } = useRouter()
  const [formData, setFormData] = useState<IformData>(initialFormData)
  const [errorData, setErrorData] = useState<IformData>(initialErrorData)

  const onSubmit = async(e) => {
    e.preventDefault()
    const isValid = Object.values(errorData).every(
      entries => entries  === true
    )
    const loginReq:ISignUpArgs =  {
      "email": formData.id,
      "password": formData.pw
    }
    if (!isValid) return alert('입력한 값이 유효하지 않습니다.');
    if (isValid) {
      const singUpResult = await signUp(loginReq)
      if(singUpResult.result === "fail") return alert('회원가입에 실패했습니다. 다시 시도 해주세요.')
      alert('회원가입이 완료되었습니다. 축하합니다! 🎉')
      routeTo("login")
    } 
  }

  return (
    <form className={styles.wrapper}>
      <FormInput
        id={"id"}
        label={"아이디"}
        formData={formData}
        setFormData={setFormData}
        errorData={errorData}
        setErrorData={setErrorData}
        inputProps={{
          type: "text",
          placeholder: "아이디를 입력해 주세요.",
          autoFocus: true
        }}
        isShowErrorMsg={true}
      />
      <FormInput
        id={"pw"}
        label={"비밀번호"}
        formData={formData}
        setFormData={setFormData}
        errorData={errorData}
        setErrorData={setErrorData}
        inputProps={{
          type: "password",
          placeholder: "비밀번호를 입력해 주세요.",
        }}
        isShowErrorMsg={true}
      />
      <FormInput
        id={"confirmPw"}
        label={"비밀번호 확인"}
        formData={formData}
        setFormData={setFormData}
        errorData={errorData}
        setErrorData={setErrorData}
        inputProps={{
          type: "password",
          placeholder: "비밀번호 확인을 입력해 주세요.",
        }}
        isShowErrorMsg={true}

      />
      <input 
        className={styles.submitBtn}
        type="submit" 
        value="가입하기" 
        onClick={(e)=> onSubmit(e)} 
      />
    </form>
  )
}
