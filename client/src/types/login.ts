export interface IFormData {
  id: string,
  pw: string,
  confirmPw?: string
}

export interface ISignUpArgs {
  email: string,
  password: string,
  isAdmin?: boolean
}

export type ISignUpResult= {
  result: "success",
  accessToken: string
} | {
    result: "fail",
    accessToken: string
  }