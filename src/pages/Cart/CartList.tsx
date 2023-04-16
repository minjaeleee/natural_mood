import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'
import { BsFillTrash3Fill } from 'react-icons/bs'
import { useSnackbar } from 'notistack'
import { AiOutlineShoppingCart } from 'react-icons/ai'

import { CartListItem } from './CartListItem'
import { RootState } from '../../store/modules'
import { ICartItems } from '../../types/cartTypes'
import { deleteCartAllItems } from '../../store/modules/cart'
import { useRouter } from '../../useHook/useRouter'
import { CART_MESSAGE } from '../../common/snackbarMessages'

import styles from './CartList.module.scss'

export const CartList = ({
  dataList
}) => { 
  const { routeTo } = useRouter()
  const dispatch = useDispatch<ThunkDispatch<RootState, void, Action>>()
  const { enqueueSnackbar } = useSnackbar();


  const onClickAllResetbtn = () => {
    if (!window.confirm("장바구니 목록을 모두 삭제하시겠습니까?")) {
      return;
    } else {
      const ids = dataList.data.map((data:ICartItems) => data.id)

      dispatch(deleteCartAllItems(ids))
      .then(()=>enqueueSnackbar(CART_MESSAGE.DELETED_CART_ALL_ITEM_SUCCESS))
      .catch(()=>enqueueSnackbar(CART_MESSAGE.DELETED_CART_ALL_ITEM_FAILURE))
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>장바구니</h2>
          {
            dataList.data.length > 0 &&
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
          }
      </div>
      {
        dataList.data.length > 0 ? 
          dataList.data.map((list:ICartItems) => 
              <ul key={list.image + list.wine}>
                <CartListItem {...{...list}}/>
              </ul>
          ) : 
        <div className={styles.noCartList}>
          <AiOutlineShoppingCart className={styles.cartImg}/>
          <p className={styles.desc}>장바구니가 비어있습니다.</p>
          <button 
            className={styles.moveToListBtn}
            onClick={()=>routeTo("/beverage/all")}
          >
            쇼핑하러 가기
          </button>
        </div>
      }
    </div>
  )
}
