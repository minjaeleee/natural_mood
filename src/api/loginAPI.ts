import { ISignUpForm, IAuthData, ISignUpRes, IloginAPIRes, ILoginReq } from "../types/login";
import { BASE_URL } from "./const";

export const signUp = async(args: ISignUpForm): Promise<ISignUpRes> => {
  const { email, password } = args
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email, password})
  })

  const getSignUpResult = await res.json()

  if(res.ok) {
    return {
      result: "success",
      signUpRes: getSignUpResult
    }
  }

  return {
    result: "fail",
    signUpRes: null
  }
}

export const login = async(args: ILoginReq): Promise<IloginAPIRes> => {
  const { email, password } = args
  const res = await fetch(`${BASE_URL}/login`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email,password})
  })

  const getUserInfo = await res.json()

  if(res.ok) {
    return {
      result: "success",
      userInfo: {...getUserInfo.user, accessToken: getUserInfo.accessToken}
    }
  }

  return {
    result: "fail",
    userInfo: null
  }
}

export const autoLogin = async(args: IAuthData): Promise<IloginAPIRes> => {
  const { id, accessToken } = args
  const res = await fetch(`${BASE_URL}/640/users/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  const userInfo = await res.json()
  if(!res.ok) {
    return {
      result: "fail",
      userInfo: null
    }
  }
  return {
    result: "success",
    userInfo: {...userInfo, accessToken}
  }
}