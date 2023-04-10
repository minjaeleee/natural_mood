import React, { useCallback, useEffect, useState } from 'react'
import { Action } from 'redux';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk';
import numeral from 'numeral'

import { ICartItems } from '../../types/cartTypes'
import { RootState } from '../../store/modules'
import { addCartItem, getCartItems, updateCartItems } from '../../store/modules/cart'
import { AmountController } from '../../common/AmountController'
import { Modal } from '../../common/Modal'

import styles from './CartModal.module.scss'

export const CART_ITEM_AMOUNT = {
  MIN: 1,
  MAX: 99,
};

export const CartModal = ({price, wine, winery, image, type, setIsOpenModal}) => {
  const dispatch = useDispatch<ThunkDispatch<RootState, null, Action>>();
  const data = useSelector((state:RootState) => state.cart)
  const [amount, setAmount] = useState<number>(1)
  
  const onClickToAddCart = () => {
    const isRepeated = data.data.find((list:ICartItems) => {
      return list.wine === wine && list.winery === winery
    })

    if(isRepeated) {
      const getItemId = isRepeated.id
      const newAmount = amount + isRepeated.amount
      const newTotalPrice = isRepeated.originalPrice * newAmount
      dispatch(updateCartItems({id: getItemId, amount: newAmount, totalPrice: newTotalPrice }))
      setIsOpenModal(false)
    }else {
      const newTotalPrice = price * amount
      dispatch(addCartItem({
        image,
        wine,
        winery,
        wineType: type,
        originalPrice: price,
        amount,
        totalPrice: newTotalPrice
      }))
      setIsOpenModal(false)
    }
  }

  const onClickDecrease = () => {
    if(amount <= CART_ITEM_AMOUNT.MIN) return;
    setAmount((prev:number) => prev-1)
  }
  
  const onClickIncrease = () => {
    if(amount >= CART_ITEM_AMOUNT.MAX) return;
    setAmount((prev:number) => prev+1)
  }

  useEffect(()=>{
    if(data.status === "IDLE") {
      dispatch(getCartItems())
    }
  },[data.status, dispatch])

  return (
    <Modal setIsOpen={setIsOpenModal}>
      <div className={styles.modal}>
        <section className={styles.productWrapper}>
          <div className={styles.winery}>{`[Winery] ${winery}`}</div>
          <div className={styles.wine}>{wine}</div>
          <div className={styles.priceAndAmount}>
            <div className={styles.price}>{price}원</div>
            <AmountController 
              onClickDecrease={onClickDecrease}
              onClickIncrease={onClickIncrease}
              price={price}
              amount={amount}
            />
          </div>
        </section>
        <section className={styles.totalPriceWrapper}>
          <div className={styles.total}>합계</div>
          {/* <div className={styles.totalPrice}>{`${numeral(changedPrice).format(0,0)} 원`}</div> */}
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
            onClick={onClickToAddCart}
          >
            장바구니 담기
          </button>
        </section>
      </div>
    </Modal>
  )
}
