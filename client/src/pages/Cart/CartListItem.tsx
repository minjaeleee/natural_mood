import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AiOutlineClose } from 'react-icons/ai'
import numeral from 'numeral'

import { deleteCartItems, updateCartItems } from '../../store/modules/cart'
import { AmountController } from '../../common/AmountController'
import { RootState } from '../../store/modules'
import { ICartItems } from '../../types/cartTypes'

import styles from './CartListItem.module.scss'

export const CartListItem = ({
  image,
  wine,
  winery,
  wineType,
  amount = 1,
  originalPrice = 0,
  totalPrice = 0,
  setDataList,
}) => {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, Action>>();
  const data = useSelector((state:RootState) => state.cart)

  const [finalTotalPrice, setFinalTotalPrice] = useState<number>(totalPrice)
  const [finalAmount, setFinalAmount] = useState<number>(amount)

  const onChangeAmount = useCallback((operator:string)=>{
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
  },[data, image, winery, wine, finalAmount, dispatch, wineType, originalPrice])

  const handleErrorImg = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "/img/default.png"
  }
  
  const onRemoveList = useCallback(()=>{
    const isRepeated = data.find((list:ICartItems) => {
      return list.image === image && list.winery === winery && list.wine === wine
    })

    dispatch(deleteCartItems(isRepeated.id))
    setDataList(prev => prev.filter((list:ICartItems) => {
      return (list.image !== image) && (list.winery !== winery) && (list.wine !== wine)
    }))
    
  },[data, dispatch, image, setDataList, wine, winery])
  
  const simpleType: string = wineType.split(' ')[0]
  
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
