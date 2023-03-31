import { IWineCartState } from "../../types/cartTypes"

// 액션 타입
const ADD_CART = 'cart/ADD' as const
const UPDATE_CART = 'cart/UPDATE' as const
const REMOVE_CART = 'cart/REMOVE' as const

//액션 생성 함수
export const addCart = (args:IWineCartState) => ({
  type: ADD_CART,
  wineList: args
})
export const updateCart = (args:IWineCartState, operator: "plus" | "minus") => ({
  type: UPDATE_CART,
  wineList: {...args, operator}
})
export const removeCart = (args?:IWineCartState | null, type?: "all") => ({
  type: REMOVE_CART,
  wineList: {...args, type}
})

const isStoredLocalStorage = localStorage.getItem('persist:root')
const getLocalStorageList = isStoredLocalStorage ? JSON.parse(JSON.parse(isStoredLocalStorage).cart) : []

type CartAction = | ReturnType<typeof addCart> | ReturnType<typeof removeCart> | ReturnType<typeof updateCart>

export const cart = (state: IWineCartState[] | [], action: CartAction) => {
  switch(action.type) {
    case ADD_CART:
      const addedCartList = [...state]
      const newAddedCartList = {
        image: action.wineList.image,
        winery: action.wineList.winery,
        wine: action.wineList.wine,
        wineType: action.wineList.wineType,
        originalPrice: action.wineList.originalPrice,
        amount: action.wineList.amount,
        totalPrice: action.wineList.totalPrice,
      }
      addedCartList.push(newAddedCartList)
      return addedCartList
    case UPDATE_CART:
        const updatedCartList = [...state]
        if(action.wineList.operator === "plus") {
          updatedCartList.map(list => {
            const isRepeatedList = list.image === action.wineList.image && list.winery === action.wineList.winery && list.wine === action.wineList.wine 
            if(isRepeatedList) {
              list.amount +=  action.wineList.amount
              list.totalPrice +=  action.wineList.totalPrice
            }
            return list
          })
          return updatedCartList
        }
        if(action.wineList.operator === "minus") {
          updatedCartList.map(list => {
            const isRepeatedList = list.image === action.wineList.image && list.winery === action.wineList.winery && list.wine === action.wineList.wine 
            if(isRepeatedList) {
              list.amount -= action.wineList.amount
              list.totalPrice -= action.wineList.totalPrice
            }
            return list
          })
          return updatedCartList
        }
        return updatedCartList
    case REMOVE_CART: 
      let removeCartList = [...state]
      if(action.wineList.type === "all") return removeCartList = []
      return removeCartList.filter(list => {
        return list.image !== action.wineList.image
      })
    default: 
      return [...getLocalStorageList]
  }   
}
