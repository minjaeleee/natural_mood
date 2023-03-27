import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { increase } from '../../store/modules/cart'
import { IWine } from '../../types/wine'
import numeral from 'numeral'

import styles from './ListItem.module.scss'
import { CartModal } from '../Cart/CartModal'

export const ListItem:React.FC<IWine> = ({image, price, wine, winery, type}) => {
  const dispatch = useDispatch()
  const [isOpenModal, setIsOpenModal] = useState(false)
  const handleErrorImg = (e) => {
    e.target.src = "/img/default.png"
  }
  const onClickHeart = (wine: string) => {
    // dispatch(increase(wine))
    setIsOpenModal(true)
  }
  const simpleType = type.split(' ')[0]
  return (
    <>
      <div className={styles.item}>
        <div className={styles.imgBox}>
        {/* https://www.builder.io/blog/fast-images?_host=www.builder.io */}
          <img
            className={styles.mainImg}
            onError={handleErrorImg}
            loading="lazy"
            decoding='async'
            src={image}
            alt={wine}
          />
        <div className={styles.cartImgBox}>
          <AiOutlineShoppingCart width={"5em"} className={styles.cartImg} onClick={() => onClickHeart(wine)}/>        
        </div>
        </div>
        <div className={styles.itemDesc}>
          {/* <span className={styles[`winetype_${type}`]}> */}
          <span className={styles[`winetype-${simpleType}`]}>
            {type}
          </span>
          <span className={styles.winery}>{`[Winery] ${winery}`}</span>
          <span className={styles.wine}>{wine}</span>
          <span className={styles.price}>{numeral(price).format(0,0)}원</span>
        </div>
      </div>
      {isOpenModal && <CartModal {...{price, wine, winery, setIsOpenModal}}/>}
    </>
  )
}
