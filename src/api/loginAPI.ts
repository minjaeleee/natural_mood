import { ISignUpForm, IAuthData, ISignUpRes, IloginAPIRes } from "../types/login";
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

  const getTokenInfo = await res.json()

  if(res.ok) {
    return {
      result: "success",
      accessToken: getTokenInfo.accessToken
    }
  }

  return {
    result: "fail",
    accessToken: null
  }
}

export const login = async(args: ISignUpForm): Promise<IloginAPIRes> => {
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

export const autoLogin = async(args: IAuthData): Promise<string> => {
  const { id, accessToken } = args
  const res = await fetch(`${BASE_URL}/640/users/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  
  if(!res.ok) return "fail";
  return "success"
}