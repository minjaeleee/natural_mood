// 액션 타입
const INCREASE = 'cart/INCREASE' as const
const DECREASE = 'cart/DECREASE' as const

//액션 생성 함수
export const increase = (item: string) => ({
  type: INCREASE,
  payload: item
})
export const decrease = (item: string) => ({
  type: DECREASE,
  payload: item
})

// 초기 상태
interface Istate {
  item: string[]
}
type CartAction = | ReturnType<typeof increase> | ReturnType<typeof decrease>

// const initialState: Istate = {
//   item: ['']
// }
const a = localStorage.getItem('persist:cart')
console.log()
export const cart = (state: Istate, action: CartAction) => {
  switch(action.type) {
    case "cart/INCREASE":
      return {
        item: [...state.item, action.payload]
      }
    case "cart/DECREASE": 
      return {
        ...state,
        item: action.payload
      }
    default: 
      return {
        item: a ? JSON.parse(JSON.parse(a).cart).item : []
      }
  }   
}
