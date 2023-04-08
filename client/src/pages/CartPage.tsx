import { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { RootState } from '../store/modules'
import { getCartItems } from '../store/modules/cart'
import { ICartItems } from '../types/cartTypes'
import { CartList } from './Cart/CartList'
import { MoreCartInfo } from './Cart/MoreCartInfo'

import styles from './CartPage.module.scss'

export const Cart = () => {
  const data = useSelector((state:RootState) => state.cart)
  const dispatch = useDispatch<ThunkDispatch<RootState, void, Action>>();
  const [dataList, setDataList] = useState<ICartItems[]>([])
  
  useEffect(()=>{
    if(data.length === 0) {
      dispatch(getCartItems())
    }
  },[data.length, dispatch])

  useEffect(()=>{
    if(data.length > 0) {
      setDataList(data)
    }
  },[data])

  return (
    <div className={styles.wrapper}>
      <section className={styles.content}>
        <CartList {...{dataList,setDataList}}/>
      </section>
      <aside className={styles.moreInfo}>
        <MoreCartInfo {...{dataList}}/>
      </aside>
    </div>
  )
}
