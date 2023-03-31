export const saveAccessTokenToLocalStorage = (accessToken: string) => {
  localStorage.setItem("accessToken",accessToken)
}

export const getAccessTokenFromLocalStorage = () => {
  return localStorage.getItem("accessToken") || ''
}