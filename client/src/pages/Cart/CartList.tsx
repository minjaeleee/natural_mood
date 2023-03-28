import { useDispatch } from 'react-redux'
import { CartListItem } from './CartListItem'
import { IWineCartState } from '../../types/cartTypes'
import { removeCart } from '../../store/modules/cart'
import { BsFillTrash3Fill } from 'react-icons/bs'

import styles from './CartList.module.scss'

export const CartList = ({
  dataList, 
  setDataList
}) => {
  const dispatch = useDispatch()
  const onClickAllResetbtn = () => {
    dispatch(removeCart(null,"all"))
    setDataList([])
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>장바구니</h2>
        <span 
          className={styles.title}
          onClick={onClickAllResetbtn}
        >
          <BsFillTrash3Fill />
          <p className={styles.allRemoveText}>
            장바구니 비우기
          </p>
        </span>
      </div>
      {dataList.map((list:IWineCartState) => 
        <ul key={list.image + list.wine}>
          <CartListItem {...{...list, dataList, setDataList}}/>
        </ul>
      )}
    </div>
  )
}
