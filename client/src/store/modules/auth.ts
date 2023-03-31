import { ISignUpArgs } from "../../types/login"

// 액션 타입
const GET_AUTH =  'get/auth' as const

// 액션 생성 함수

export const getAuth = (args:ISignUpArgs) => ({
  type: GET_AUTH,
  data: args 
})

const initialState = {
  email: ""
}

const isStoredLocalStorage = localStorage.getItem('persist:root')
const getLocalStorageList = isStoredLocalStorage ? JSON.parse(JSON.parse(isStoredLocalStorage).auth) : []

export const auth = (state=initialState, action) => {
  switch(action.type) {
    case GET_AUTH:
      const newAuth = {
        ...state, 
        email: action.data.email,
      }
      return newAuth
    default:
      return {
        ...getLocalStorageList
      }
  }
}