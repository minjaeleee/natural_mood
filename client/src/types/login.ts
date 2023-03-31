export interface IFormData {
  id: string,
  pw: string,
  confirmPw?: string
}

export interface ILoginReq {
  email: string,
  password: string,
  isAdmin?: boolean
}

export interface ILoginRes {
  id: number,
  email?: string,
  isAdmin?: boolean,
  accessToken: string
}

export type ISignUpResult= {
  result: "success",
  accessToken: string
} | {
    result: "fail",
    accessToken: string
  }