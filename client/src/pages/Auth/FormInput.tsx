import React, { SetStateAction } from 'react'
import { IFormData } from '../../types/login'

import styles from './FormInput.module.scss'

interface IInputProps {
  type: string,
  placeholder: string,
  autoFocus?: boolean
}
interface IFormInput {
  id: string,
  label: string,
  formData: IFormData,
  setFormData: React.Dispatch<SetStateAction<IFormData>>
  errorData?: IFormData,
  setErrorData?: React.Dispatch<SetStateAction<IFormData>>,
  inputProps: IInputProps,
  isShowErrorMsg?: boolean
}

export const FormInput:React.FC<IFormInput> = ({
  id, 
  label, 
  formData, 
  setFormData, 
  errorData,
  setErrorData,
  inputProps,
  isShowErrorMsg
}) => {
  const idRegex = /[A-Za-z0-9]*@[A-Za-z.]*.[a-z]{2,6}$/
  const pwRegex = /[A-Za-z0-9]{8,16}/

  const errorMessage = {
      required: "필수 정보입니다.",
      invalidId: "영문 대 소문자, 숫자를 사용하여 이메일 형식으로 만드세요.",
      invalidPw: "8~16자 영문 대 소문자, 숫자를 사용하세요.",
      invalidPwCheck: "비밀번호가 일치하지 않습니다.",
  }

  const checkErrorMsg = (inputId: string) => {
    const value = formData[inputId]
    let result: boolean | string
    if(value?.length === 0) {
      return "required"
    } else {
      switch(inputId) {
        case "id":
          result = idRegex.test(value) ? true : "invalidId"
          break;
        case 'pw':
          result = pwRegex.test(value) ? true : 'invalidPw'
          break;
        case 'confirmPw':
          result = value === formData["pw"] ? true : 'invalidPwCheck'
          break;
        default:
          break;
      }
    }
    setErrorData(prev => ({...prev, [inputId]: result}))
  }
  
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        autoComplete='off'
        value={formData[id]}
        onChange={(e)=> setFormData(prev => ({...prev, [id]:e.target.value }))}
        {...inputProps}
        {...(isShowErrorMsg && {onBlur: ()=> checkErrorMsg(id)})}
      />
      {
        isShowErrorMsg &&
        <div className={styles.errorMsg}>
          {errorMessage[errorData[id]]}
        </div>
      }
    </div>
  )
}
