import React, { useCallback, useEffect, useState } from 'react'
import { Action } from 'redux';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk';
import numeral from 'numeral'

import { ICartItems } from '../../types/cartTypes'
import { RootState } from '../../store/modules'
import { createCartItem, getCartItems, updateCartItems } from '../../store/modules/cart'
import { AmountController } from '../../common/AmountController'
import { Modal } from '../../common/Modal'

import styles from './CartModal.module.scss'

export const CartModal = ({price, wine, winery, image, type, setIsOpenModal}) => {
  const dispatch = useDispatch<ThunkDispatch<RootState, null, Action>>();
  const data = useSelector((state:RootState) => state.cart)
  const [changedPrice, setChangedPrice] = useState<number>(price)
  const [amount, setAmount] = useState<number>(1)

  const onChangeAmount = useCallback((operator:string, price: number)=>{
    if(operator === "minus") {
      if(amount<2) return; 
      setChangedPrice(prev => prev-price)
      setAmount(prev => prev-1)
    } else {
      setChangedPrice(prev => prev+price)
      setAmount(prev => prev+1)
    }
  },[amount])

  const handleCartInfo = (args:ICartItems) => {
    const isRepeated = data.find((list:ICartItems) => {
      return list.image === args.image && list.winery === args.winery && list.wine === args.wine
    })

    if(isRepeated) {
      const getItemId = isRepeated.id
      dispatch(updateCartItems({...args, id: getItemId}, "plus"))
      setIsOpenModal(false)
    }else {
      dispatch(createCartItem(args))
      setIsOpenModal(false)
    }
  }

  useEffect(()=>{
    if(data.length === 0) {
      dispatch(getCartItems())
    }
  },[])
  
  return (
    <Modal setIsOpen={setIsOpenModal}>
      <div className={styles.modal}>
        <section className={styles.productWrapper}>
          <div className={styles.winery}>{`[Winery] ${winery}`}</div>
          <div className={styles.wine}>{wine}</div>
          <div className={styles.priceAndAmount}>
            <div className={styles.price}>{price}원</div>
            <AmountController 
              changeAmount={onChangeAmount}
              price={price}
              amount={amount}
            />
          </div>
        </section>
        <section className={styles.totalPriceWrapper}>
          <div className={styles.total}>합계</div>
          <div className={styles.totalPrice}>{`${numeral(changedPrice).format(0,0)} 원`}</div>
        </section>
        <section className={styles.buttonWrapper}>
          <button 
            className={styles.closeBtn}
            onClick={()=>setIsOpenModal(false)}
          >
            닫기
          </button>
          <button 
            className={styles.addCartBtn}
            onClick={()=>handleCartInfo({
              image, 
              winery, 
              wine, 
              wineType: type, 
              originalPrice: price,
              amount, 
              totalPrice: changedPrice,
            })}
          >
            장바구니 담기
          </button>
        </section>
      </div>
    </Modal>
  )
}
