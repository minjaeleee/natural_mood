import { ISignUpArgs, ISignUpResult } from "../types/login";
import { BASE_URL } from "./const";

export const signUp = async(args: ISignUpArgs): Promise<ISignUpResult> => {
  const { email, password } = args
  const res = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
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