import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import numeral from 'numeral'
import { AmountController } from '../../common/AmountController'
// import { removeCart, updateCart } from '../../store/modules/cart'
import { AiOutlineClose } from 'react-icons/ai'

import styles from './CartListItem.module.scss'
import { deleteCartItems, updateCartItems } from '../../store/modules/cart'
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../store/modules'
import { Action } from 'redux';
import { useSelector } from 'react-redux'
import { ICartItems } from '../../types/cartTypes'

export const CartListItem = ({
  image,
  wine,
  winery,
  wineType,
  amount = 1,
  originalPrice = 0,
  totalPrice = 0,
  setDataList,
  dataList
}) => {
  const dispatch = useDispatch<ThunkDispatch<RootState, null, Action>>();
  const data = useSelector((state:RootState) => state.cart)

  const [finalTotalPrice, setFinalTotalPrice] = useState<number>(totalPrice)
  const [finalAmount, setFinalAmount] = useState<number>(amount)

  const onChangeAmount = useCallback((operator:string, price: number)=>{
    const isRepeated = data.find((list:ICartItems) => {
      return list.image === image && list.winery === winery && list.wine === wine
    })

    if(operator === "minus") {
      if(finalAmount<2) return; 
      setFinalTotalPrice(prev => prev-originalPrice)
      setFinalAmount(prev => prev-1)
      dispatch(updateCartItems({image,winery,wine,amount:1,wineType, totalPrice:originalPrice, id: isRepeated.id}, "minus"))
    } else {
      setFinalTotalPrice(prev => prev+originalPrice)
      setFinalAmount(prev => prev+1)
      dispatch(updateCartItems({image,winery,wine,amount:1,wineType, totalPrice:originalPrice, id: isRepeated.id}, "plus"))
    }
  },[finalAmount, dispatch, image, winery, wine, wineType, originalPrice])

  const handleErrorImg = (e) => {
    e.target.src = "/img/default.png"
  }
  
  const onRemoveList = useCallback(()=>{
    const isRepeated = data.find((list:ICartItems) => {
      return list.image === image && list.winery === winery && list.wine === wine
    })

    dispatch(deleteCartItems(isRepeated.id))
    setDataList(prev => prev.filter(list => {
      return (list.image !== image) && (list.winery !== winery) && (list.wine !== wine)
    }))
    
  },[dispatch, image, setDataList, wine, wineType, winery])
  
  const simpleType = wineType.split(' ')[0]
  
  return (
    <li className={styles.listWrapper}>
      <div className={styles.imageBox}>
        <img 
          className={styles.mainImg}
          onError={handleErrorImg}
          loading="lazy"
          decoding="async"
          src={image} 
          alt={wine}
        />
      </div>
      <div className={styles.info}>
        <span className={styles[`winetype-${simpleType}`]}>{wineType}</span>
        <span className={styles.winery}>{`[Winery] ${winery}`}</span>
        <span className={styles.wine}>{wine}</span>
        <div className={styles.priceAndAmountBox}>
          <AmountController
            changeAmount={onChangeAmount}
            price={finalTotalPrice}
            amount={finalAmount}
          />
          <span className={styles.totalPrice}>
            {`${numeral(finalTotalPrice).format(0,0)} 원`}
          </span>
        </div>
      </div>
      <div className={styles.removeBox}>
        <AiOutlineClose 
          className={styles.removeBtn}
          onClick={onRemoveList}
        />
      </div>
    </li>
  )
}
