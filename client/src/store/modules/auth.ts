import { ILoginRes } from "../../types/login"

// 액션 타입
const GET_AUTH =  'get/auth' as const

// 액션 생성 함수

export const getAuth = (args:ILoginRes) => ({
  type: GET_AUTH,
  data: args 
})

const isStoredLocalStorage = localStorage.getItem('persist:root')
const getLocalStorageList = isStoredLocalStorage ? JSON.parse(JSON.parse(isStoredLocalStorage).auth) : []

type AuthAction = ReturnType<typeof getAuth>

export const auth = (state:ILoginRes, action: AuthAction) => {
  switch(action.type) {
    case GET_AUTH:
      const getAuth = {
        ...state,
        id: action.data.id,
        email: action.data.email,
        accessToken: action.data.accessToken
      }
      return getAuth
    default:
      return {
        ...getLocalStorageList
      }
  }
}