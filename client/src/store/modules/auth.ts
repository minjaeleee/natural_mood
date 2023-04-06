import { ILoginRes } from "../../types/login"

// 액션 타입
const GET_AUTH =  'get/auth' as const
const LOGOUT = 'logout/auth' as const

// 액션 생성 함수

export const getAuth = (args:ILoginRes) => ({
  type: GET_AUTH,
  data: args 
})

export const logout = () => ({
  type: LOGOUT
})

const isStoredLocalStorage = localStorage.getItem('persist:root')
const getLocalStorageList = isStoredLocalStorage ? JSON.parse(JSON.parse(isStoredLocalStorage).auth) : []

type AuthAction = ReturnType<typeof getAuth> | ReturnType<typeof logout>

export const auth = (state:ILoginRes = getLocalStorageList , action: AuthAction) => {
  switch(action.type) {
    case GET_AUTH:
      const getAuth = {
        id: action.data.id,
        email: action.data.email,
        isAdmin: action.data.isAdmin,
        accessToken: action.data.accessToken
      }
      return getAuth;
    case LOGOUT:
      return {};
    default:
      return {
        ...state
      }
  }
}