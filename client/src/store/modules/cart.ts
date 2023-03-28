import { IWineCartState } from "../../types/cartTypes"

// 액션 타입
const ADD_CART = 'cart/ADD' as const
const DELETE_CART = 'cart/REMOVE' as const

//액션 생성 함수
export const addCart = (args:IWineCartState) => ({
  type: ADD_CART,
  image: args.image,
  winery: args.winery,
  wine: args.wine,
  wineType: args.wineType,
  amount: args.amount,
  totalPrice: args.totalPrice
})
export const removeCart = (args:IWineCartState) => ({
  type: DELETE_CART,
  image: args.image,
  winery: args.winery,
  wine: args.wine,
  wineType: args.wineType,
  amount: args.amount,
  totalPrice: args.totalPrice
})

// 초기 상태
// const initialState = [{
//   image: '',
//   winery: '',
//   wine: '',
//   amount: 0,
//   totalPrice: 0
// }]

const isStoredLocalStorage = localStorage.getItem('persist:cart')
const getLocalStorageList = isStoredLocalStorage ? JSON.parse(JSON.parse(isStoredLocalStorage).cart) : []

type CartAction = | ReturnType<typeof addCart> | ReturnType<typeof removeCart>

export const cart = (state: IWineCartState[] | [], action: CartAction) => {
  switch(action.type) {
    case ADD_CART:
      const addCartList = [...state]
      const addedList = {
        image: action.image,
        winery: action.winery,
        wine: action.wine,
        wineType: action.wineType,
        amount: action.amount,
        totalPrice: action.totalPrice,
      }
      addCartList.push(addedList)
      return addCartList
    case DELETE_CART: 
      const removeCartList = [...state]
      const removedList = {
        image: action.image,
        winery: action.winery,
        wine: action.wine,
        wineType: action.wineType,
        amount: action.amount,
        totalPrice: action.totalPrice,
      }
      removeCartList.push(removedList)
      return removeCartList
    default: 
      return [...getLocalStorageList]
  }   
}
