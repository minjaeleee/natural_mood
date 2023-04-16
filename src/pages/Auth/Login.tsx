import React, { useState } from 'react'
import { Action } from 'redux';
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { useSnackbar } from 'notistack';

import { FormInput } from './FormInput'
import { RootState } from '../../store/modules'
import { AUTH_MESSAGE } from '../../common/snackbarMessages';
import { getLoginAuth } from '../../store/modules/auth';
import { IFormData } from '../../types/login'
import { useRouter } from '../../useHook/useRouter'

import styles from './Login.module.scss'

const initialFormData: IFormData = {
  id: '',
  pw: '',
}

interface ILoginForm {
  email: string,
  password: string
}

export const Login = () => {
  const { routeTo } = useRouter()
  const dispatch = useDispatch<ThunkDispatch<RootState, void, Action>>();
  const [formData, setFormData] = useState<IFormData>(initialFormData)
  const { enqueueSnackbar } = useSnackbar()

  const onSubmit = async(e) => {
    e.preventDefault()
    const loginReq: ILoginForm = {
      "email": formData.id,
      "password": formData.pw
    }
    dispatch(getLoginAuth(loginReq))
      .then(()=> {
        enqueueSnackbar(AUTH_MESSAGE.LOGIN_SUCCESS)
        routeTo('/beverage/all')
      })
      .catch(()=> enqueueSnackbar(AUTH_MESSAGE.LOGIN_FAILURE))
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
