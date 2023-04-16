export interface IFormData {
  id: string,
  pw: string,
  confirmPw?: string
}

export interface ISignUpForm {
  email: string,
  password: string,
  isAdmin?: boolean
}

export interface ILoginReq {
  email: string,
  password: string,
  isAdmin?: boolean
}

export interface IAuthData {
  id?: number,
  email?: string,
  isAdmin?: boolean,
  accessToken?: string
}

export interface ISignUpRes {
  result: "success" | "fail",
  signUpRes: IAuthData | null
}

export interface IloginAPIRes {
  result: "success" | "fail",
  userInfo: IAuthData | null
}