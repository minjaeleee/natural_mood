import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AiOutlineClose } from 'react-icons/ai'
import numeral from 'numeral'
import { useSnackbar } from 'notistack';

import { CART_ITEM_AMOUNT } from './CartModal';
import { deleteCartItems, updateCartItems} from '../../store/modules/cart'
import { AmountController } from '../../common/AmountController'
import { RootState } from '../../store/modules'
import { ICartItems } from '../../types/cartTypes'
import MESSAGE from '../../common/messages';

import styles from './CartListItem.module.scss'

export const CartListItem = ({
  id = 0,
  image,
  wine,
  winery,
  wineType,
  amount = 1,
  originalPrice = 0,
  totalPrice = 0,
}) => {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, Action>>();
  const data = useSelector((state:RootState) => state.cart)
  const { enqueueSnackbar } = useSnackbar();

  const handleErrorImg = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "/img/default.png"
  }
  
  const onRemoveList = useCallback(()=>{
    const isRepeated = data.data.find((list:ICartItems) => {
      return list.image === image && list.winery === winery && list.wine === wine
    })

    dispatch(deleteCartItems(isRepeated.id))
    .then(()=>enqueueSnackbar(MESSAGE.DELETED_CART_ITEM_SUCCESS))
    .catch(()=>enqueueSnackbar(MESSAGE.DELETED_CART_ITEM_FAILURE))

  },[data.data, dispatch, enqueueSnackbar, image, wine, winery])
  
  const simpleType: string = wineType.split(' ')[0]

  const onClickDecrease = useCallback(() => {
    const newTotalPrice = (amount-1) * originalPrice
    if(amount <= CART_ITEM_AMOUNT.MIN) return;

    dispatch(
      updateCartItems({id, amount:amount-1, totalPrice: newTotalPrice})
    )
  },[amount, dispatch, id, originalPrice])
  
  const onClickIncrease = useCallback(() => {
    const newTotalPrice = (amount+1) * originalPrice
    if(amount >= CART_ITEM_AMOUNT.MAX) return;
    dispatch(updateCartItems({id, amount:amount+1, totalPrice: newTotalPrice}))
  },[amount, dispatch, id, originalPrice])

  return (
    <li className={styles.listWrapper}>
      <div className={styles.imageBox}>
        <img 
          className={styles.mainImg}
          onError={handleErrorImg}
          loading="lazy"
          decoding="async"
          src={image} 
          alt={wine}
        />
      </div>
      <div className={styles.info}>
        <span className={styles[`winetype-${simpleType}`]}>{wineType}</span>
        <span className={styles.winery}>{`[Winery] ${winery}`}</span>
        <span className={styles.wine}>{wine}</span>
        <div className={styles.priceAndAmountBox}>
          <AmountController
            onClickDecrease={onClickDecrease}
            onClickIncrease={onClickIncrease}
            amount={amount}
          />
          <span className={styles.totalPrice}>
            {`${numeral(totalPrice).format(0,0)} 원`}
          </span>
        </div>
      </div>
      <div className={styles.removeBox}>
        <AiOutlineClose 
          className={styles.removeBtn}
          onClick={onRemoveList}
        />
      </div>
    </li>
  )
}
