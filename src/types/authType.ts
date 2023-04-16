import { GET_AUTO_LOGIN_FAIL, GET_AUTO_LOGIN_REQUEST, GET_AUTO_LOGIN_SUCCESS, GET_LOGIN_FAIL, GET_LOGIN_REQUEST, GET_LOGIN_SUCCESS, GET_LOGOUT_SUCCESS, GET_SIGN_UP_FAIL, GET_SIGN_UP_REQUEST, GET_SIGN_UP_SUCCESS } from "../store/modules/auth";
import { IAuthData } from "./login";

export interface IGetLoginRequestAction {
  type: typeof GET_LOGIN_REQUEST
}

export interface IGetLoginSuccessAction {
  type: typeof GET_LOGIN_SUCCESS
  item: IAuthData
}

export interface IGetLoginFailAction {
  type: typeof GET_LOGIN_FAIL
  error: string | null
}

export interface IGetLogoutSuccessAction {
  type: typeof GET_LOGOUT_SUCCESS
}

export interface IGetAutoLoginRequestAction {
  type: typeof GET_AUTO_LOGIN_REQUEST
}

export interface IGetAutoLoginSuccessAction {
  type: typeof GET_AUTO_LOGIN_SUCCESS
  item: IAuthData
}

export interface IGetAutoLoginFailAction {
  type: typeof GET_AUTO_LOGIN_FAIL
  error: string | null
}

export interface IGetSignUpRequestAction {
  type: typeof GET_SIGN_UP_REQUEST
}

export interface IGetSignUpSuccessAction {
  type: typeof GET_SIGN_UP_SUCCESS
  item: IAuthData
}
export interface IGetSignUpFailAction {
  type: typeof GET_SIGN_UP_FAIL,
  error: string | null
}

export interface IAuthState {
  status: string,
  error: string | null,
  data: IAuthData
}