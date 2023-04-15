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

export interface IAuthData {
  id?: number,
  email?: string,
  isAdmin?: boolean,
  accessToken?: string
}

export type ISignUpRes= {
  result: "success",
  accessToken: string
} | {
    result: "fail",
    accessToken: string
  }

export interface IloginAPIRes {
  result: "success" | "fail",
  userInfo: IAuthData | null
}