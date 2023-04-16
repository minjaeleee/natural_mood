import React, { useCallback, useEffect, useState } from 'react'
import { Action } from 'redux';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk';
import { useSnackbar } from 'notistack';
import numeral from 'numeral'

import { ICartItems } from '../../types/cartTypes'
import { RootState } from '../../store/modules'
import { addCartItem, getCartItems, updateCartItems } from '../../store/modules/cart'
import { AmountController } from '../../common/AmountController'
import { CART_MESSAGE } from '../../common/snackbarMessages';
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
  const { enqueueSnackbar } = useSnackbar();

  const onClickToAddCart = () => {
    const isRepeated = data.data.find((list:ICartItems) => {
      return list.wine === wine && list.winery === winery
    })

    if(isRepeated) {
      const getItemId = isRepeated.id
      const newAmount = amount + isRepeated.amount
      const newTotalPrice = isRepeated.originalPrice * newAmount

      dispatch(
        updateCartItems({id: getItemId, amount: newAmount, totalPrice: newTotalPrice })
      )
      .then(()=> enqueueSnackbar(CART_MESSAGE.ADDED_CART_ITEM_SUCCESS))
      .catch(()=> enqueueSnackbar(CART_MESSAGE.ADDED_CART_ITEM_FAILURE))

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
      .then(()=> enqueueSnackbar(CART_MESSAGE.ADDED_CART_ITEM_SUCCESS))
      .catch(()=> enqueueSnackbar(CART_MESSAGE.ADDED_CART_ITEM_FAILURE))

      setIsOpenModal(false)
    }
  }

  const onClickDecrease = useCallback(() => {
    if(amount <= CART_ITEM_AMOUNT.MIN) return;
    setAmount((prev:number) => prev-1)
  },[amount])
  
  const onClickIncrease = useCallback(() => {
    if(amount >= CART_ITEM_AMOUNT.MAX) return;
    setAmount((prev:number) => prev+1)
  },[amount])

  useEffect(()=>{
      dispatch(getCartItems())
  },[data.status, dispatch])

  const totalPrice = amount * price
  return (
    <Modal setIsOpen={setIsOpenModal}>
      <div className={styles.modal}>
        <section className={styles.productWrapper}>
          <div className={styles.winery}>{`[Winery] ${winery}`}</div>
          <div className={styles.wine}>{wine}</div>
          <div className={styles.priceAndAmount}>
            <div className={styles.price}>{`${numeral(price).format(0,0)} 원`}</div>
            <AmountController 
              onClickDecrease={onClickDecrease}
              onClickIncrease={onClickIncrease}
              amount={amount}
            />
          </div>
        </section>
        <section className={styles.totalPriceWrapper}>
          <div className={styles.total}>합계</div>
          <div className={styles.totalPrice}>{`${numeral(totalPrice).format(0,0)} 원`}</div>
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
