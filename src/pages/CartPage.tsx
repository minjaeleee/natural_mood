import { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { RootState } from '../store/modules'
import { getCartItems } from '../store/modules/cart'
import { ICartState } from '../types/cartTypes'
import { CartList } from './Cart/CartList'
import { MoreCartInfo } from './Cart/MoreCartInfo'

import styles from './CartPage.module.scss'

export const Cart = () => {
  const cart = useSelector((state:RootState) => state.cart)
  const dispatch = useDispatch<ThunkDispatch<RootState, void, Action>>();
  const [dataList, setDataList] = useState({} as ICartState)
  
  useEffect(()=>{
   dispatch(getCartItems())
  },[])
  
  useEffect(()=>{
    cart.status !== "IDLE" && setDataList(prev => ({...cart}))
  },[cart])

  return (
    Object.keys(dataList).length > 0 &&
    <div className={styles.wrapper}>
      <section className={styles.content}>
        <CartList dataList={dataList}/>
      </section>
      <aside className={styles.moreInfo}>
        <MoreCartInfo dataList={dataList}/>
      </aside>
    </div>
  )
}
