import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import numeral from 'numeral'
import { AmountController } from '../../common/AmountController'
import { Modal } from '../../common/Modal'
import { IWineCartState } from '../../types/cartTypes'
import { addCart, updateCart } from '../../store/modules/cart'
import { RootState } from '../../store/modules'

import styles from './CartModal.module.scss'

export const CartModal = ({price, wine, winery, image, type, setIsOpenModal}) => {
  const dispatch = useDispatch()
  const cartList = useSelector((state:RootState) => state.cart)
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

  const handleCartInfo = (args:IWineCartState) => {
    const isRepeated = cartList.find(list => {
      return list.image === args.image && list.winery === args.winery && list.wine === args.wine
    })

    if(isRepeated) {
      dispatch(updateCart(args, "plus"))
      setIsOpenModal(false)
    }else {
      dispatch(addCart(args))
      setIsOpenModal(false)
    }
  }

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
