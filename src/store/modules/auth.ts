import { Dispatch } from "redux"
import produce, { Draft } from "immer"

import { statusType } from "./statusType"
import { IAuthData, ILoginReq, ISignUpForm } from "../../types/login"
import { IAuthState, IGetAutoLoginFailAction, IGetAutoLoginRequestAction, IGetAutoLoginSuccessAction, IGetLoginFailAction, IGetLoginRequestAction, IGetLoginSuccessAction, IGetLogoutSuccessAction, IGetSignUpFailAction, IGetSignUpRequestAction, IGetSignUpSuccessAction } from "../../types/authType"
import { autoLogin, login, signUp } from "../../api/loginAPI"

export const GET_LOGIN_REQUEST = "auth/GET_LOGIN_REQUEST" as const 
export const GET_LOGIN_SUCCESS = "auth/GET_LOGIN_SUCCESS" as const 
export const GET_LOGIN_FAIL = "auth/GET_LOGIN_FAIL" as const 

export const GET_LOGOUT_SUCCESS = "auth/GET_LOGOUT_SUCCESS" as const 

export const GET_AUTO_LOGIN_REQUEST = "auth/GET_AUTO_LOGIN_REQUEST" as const
export const GET_AUTO_LOGIN_SUCCESS = "auth/GET_AUTO_LOGIN_SUCCESS" as const
export const GET_AUTO_LOGIN_FAIL = "auth/GET_AUTO_LOGIN_FAIL" as const

export const GET_SIGN_UP_REQUEST = "auth/GET_SIGN_UP_REQUEST" as const
export const GET_SIGN_UP_SUCCESS = "auth/GET_SIGN_UP_SUCCESS" as const
export const GET_SIGN_UP_FAIL = "auth/GET_SIGN_UP_FAIL" as const

type GetLoginAction = IGetLoginRequestAction | IGetLoginSuccessAction | IGetLoginFailAction
type GetLogoutAction = IGetLogoutSuccessAction
type GetAutoLoginAction = IGetAutoLoginRequestAction | IGetAutoLoginSuccessAction | IGetAutoLoginFailAction
type GetSignUpAction = IGetSignUpRequestAction | IGetSignUpSuccessAction | IGetSignUpFailAction

const getErrorMessage= (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
}

export const getLoginAuth = (args:ILoginReq) => async(dispatch:Dispatch<GetLoginAction>) => {
  dispatch({type: GET_LOGIN_REQUEST})

  try {
    const loginResult = await login(args)
    dispatch({type: GET_LOGIN_SUCCESS, item: loginResult.userInfo})
  } catch(error) {
    dispatch({type: GET_LOGIN_FAIL, error: getErrorMessage(error)})
  }
}

export const getLogoutAuth = () => async(dispatch:Dispatch<GetLogoutAction>) => {
  dispatch({type: GET_LOGOUT_SUCCESS})
}

export const getAutoLoginAuth = (args:IAuthData) => async(dispatch:Dispatch<GetAutoLoginAction>) => {
  dispatch({type: GET_AUTO_LOGIN_REQUEST})

  try {
    const autoLoginResult = await autoLogin(args)
    dispatch({type: GET_AUTO_LOGIN_SUCCESS, item: autoLoginResult.userInfo})
  } catch(error) {
    dispatch({type: GET_AUTO_LOGIN_FAIL, error: getErrorMessage(error)})
  }
}

export const getSignUpAuth = (args:ISignUpForm) => async(dispatch:Dispatch<GetSignUpAction>) => {
  dispatch({type: GET_SIGN_UP_REQUEST})

  try {
    const getSignUpResult = await signUp(args)
    dispatch({type: GET_SIGN_UP_SUCCESS, item: getSignUpResult.signUpRes})
  } catch(error) {
    dispatch({type: GET_SIGN_UP_FAIL, error: getErrorMessage(error)})
  }
}

const isStoredLocalStorage = localStorage.getItem('persist:root')
const getUserData = isStoredLocalStorage ? JSON.parse(JSON.parse(isStoredLocalStorage).auth) : []

const initialState:IAuthState = getUserData 
? getUserData 
: {
  status: "IDLE",
  error: null,
  data: {}
}

export const auth = (
  state:
    IAuthState = initialState,
  action: 
    GetLoginAction |
    GetLogoutAction |
    GetAutoLoginAction |
    GetSignUpAction
  ) => {
  switch(action.type) {
    case GET_LOGIN_REQUEST:
      return produce(state, (draft: Draft<IAuthState>) => {
        draft.status =  statusType.req
      })
    case GET_LOGIN_SUCCESS:
      return produce(state, (draft: Draft<IAuthState>) => {
        draft.status =  statusType.success
        draft.data = {...action.item}
      })
    case GET_LOGIN_FAIL:
      return produce(state, (draft: Draft<IAuthState>) => {
        draft.status =  statusType.fail
        draft.error = action.error
      })
    case GET_LOGOUT_SUCCESS:
      return produce(state, (draft: Draft<IAuthState>) => {
        draft.status =  statusType.success
        draft.data = {}
      })
    case GET_AUTO_LOGIN_REQUEST:
      return produce(state, (draft: Draft<IAuthState>) => {
        draft.status =  statusType.req
      })
    case GET_AUTO_LOGIN_SUCCESS:
      return produce(state, (draft: Draft<IAuthState>) => {
        draft.status =  statusType.success
        draft.data = {...action.item}
      })
    case GET_AUTO_LOGIN_FAIL:
      return produce(state, (draft: Draft<IAuthState>) => {
        draft.status =  statusType.fail
        draft.error = action.error
      })
    case GET_SIGN_UP_REQUEST:
      return produce(state, (draft: Draft<IAuthState>) => {
        draft.status =  statusType.req
      })
    case GET_SIGN_UP_SUCCESS:
      return produce(state, (draft: Draft<IAuthState>) => {
        draft.status =  statusType.success
        draft.data = {...action.item}
      })
    case GET_SIGN_UP_FAIL:
      return produce(state, (draft: Draft<IAuthState>) => {
        draft.status =  statusType.success
        draft.error = action.error
      })
    default:
      return {...state}
  }
}