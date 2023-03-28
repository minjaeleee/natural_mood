import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/modules'
import { IWineCartState } from '../types/cartTypes'
import { CartList } from './Cart/CartList'
import { MoreCartInfo } from './Cart/MoreCartInfo'

import styles from './CartPage.module.scss'

export const Cart = () => {
  const data = useSelector((state:RootState) => state.cart)
  const [dataList, setDataList] = useState<IWineCartState[]|[]>(data)

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
