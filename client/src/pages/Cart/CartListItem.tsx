import { useCallback, useState } from 'react'
import { AmountController } from '../../common/AmountController'
import numeral from 'numeral'

import styles from './CartListItem.module.scss'
import { useDispatch } from 'react-redux'
import { removeCart, updateCart } from '../../store/modules/cart'

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
  const dispatch = useDispatch()
  const [finalTotalPrice, setFinalTotalPrice] = useState<number>(totalPrice)
  const [finalAmount, setFinalAmount] = useState<number>(amount)

  const onChangeAmount = useCallback((operator:string, price: number)=>{
    if(operator === "minus") {
      if(finalAmount<2) return; 
      setFinalTotalPrice(prev => prev-originalPrice)
      setFinalAmount(prev => prev-1)
      dispatch(updateCart({image,winery,wine,amount:1,wineType, totalPrice:originalPrice},"minus"))
    } else {
      setFinalTotalPrice(prev => prev+originalPrice)
      setFinalAmount(prev => prev+1)
      dispatch(updateCart({image,winery,wine,amount:1,wineType ,totalPrice:originalPrice},"plus"))
    }
  },[finalAmount, dispatch, image, winery, wine, wineType, originalPrice])

  const handleErrorImg = (e) => {
    e.target.src = "/img/default.png"
  }
  
  const onRemoveList = useCallback(()=>{
    dispatch(removeCart({image, winery, wine, wineType}))
    setDataList(prev => prev.filter(list => {
      return list.image !== image && list.winery !== winery && list.wine !== wine && list.wineType !== wineType
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
      <button onClick={onRemoveList}>XXX</button>
    </li>
  )
}
