import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'
import { BsFillTrash3Fill } from 'react-icons/bs'

import { CartListItem } from './CartListItem'
import { RootState } from '../../store/modules'
import { ICartItems } from '../../types/cartTypes'
import { deleteCartAllItems } from '../../store/modules/cart'

import styles from './CartList.module.scss'

export const CartList = ({
  dataList, 
  setDataList
}) => { 
  const dispatch = useDispatch<ThunkDispatch<RootState, void, Action>>()

  const onClickAllResetbtn = () => {
    if (!window.confirm("장바구니 목록을 모두 삭제하시겠습니까?")) {
      return;
    } else {
      const ids = dataList.data.map((data:ICartItems) => data.id)
      dispatch(deleteCartAllItems(ids))
    }
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
          <p 
            className={styles.allRemoveText}
          >
            장바구니 비우기
          </p>
        </span>
      </div>
      {dataList.data.map((list:ICartItems) => 
          <ul key={list.image + list.wine}>
            <CartListItem {...{...list}}/>
          </ul>
      )}
    </div>
  )
}
