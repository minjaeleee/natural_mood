import React, { useState } from 'react'
import { Action } from 'redux'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { useSnackbar } from 'notistack'

import { FormInput } from './FormInput'
import { RootState } from '../../store/modules'
import { IFormData, ISignUpForm } from '../../types/login'
import { useRouter } from '../../useHook/useRouter'
import { getSignUpAuth } from '../../store/modules/auth'
import { AUTH_MESSAGE } from '../../common/snackbarMessages'

import styles from './SignUp.module.scss'

const initialFormData: IFormData = {
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
  const dispatch = useDispatch<ThunkDispatch<RootState, void, Action>>()
  const { enqueueSnackbar } = useSnackbar()
  const { routeTo } = useRouter()
  const [formData, setFormData] = useState<IFormData>(initialFormData)
  const [errorData, setErrorData] = useState<IFormData>(initialErrorData)

  const onSubmit = async(e) => {
    e.preventDefault()
    const isValid = Object.values(errorData).every(
      entries => entries  === true
    )
    const signUpReq:ISignUpForm =  {
      "email": formData.id,
      "password": formData.pw
    }
    if (!isValid) return alert('입력한 값이 유효하지 않습니다.');
    if (isValid) {
      dispatch(getSignUpAuth(signUpReq))
        .then(()=>{
          enqueueSnackbar(AUTH_MESSAGE.SIGN_UP_SUCCESS)
          routeTo("login")
        })
        .catch(()=> enqueueSnackbar(AUTH_MESSAGE.SIGN_UP_FAIL))
    } 
  }

  return (
    <form className={styles.wrapper}>
      <h1 className={styles.title}>회원가입</h1>
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
