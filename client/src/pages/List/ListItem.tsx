import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { increase } from '../../store/modules/cart'
import { IWine } from '../../types/wine'
import numeral from 'numeral'

import styles from './ListItem.module.scss'

export const ListItem:React.FC<IWine> = ({image, price, wine, winery, type}) => {
  const wineTypeRef = useRef(null)
  const dispatch = useDispatch()
  const handleErrorImg = (e) => {
    e.target.src = "/img/default.png"
  }
  const onClickHeart = (wine: string) => {
    dispatch(increase(wine))
  }

  useEffect(()=>{
    switch(type) {
      case "Red Wine":
        wineTypeRef.current.style.color = "#B70055"
        break;
      case "White Wine":
        wineTypeRef.current.style.color = "#FFD2CC"
        break;
      case "Sparkling Wine":
        wineTypeRef.current.style.color = "#F4B000"
        break;
      case "Rose Wine":
        wineTypeRef.current.style.color = "#FF9B99"
        break;
      case "Port Wine":
        wineTypeRef.current.style.color = "#7A0050"
        break;
      case "Dessert Wine":
        wineTypeRef.current.style.color = "#FFE100"
        break;
      default:
        wineTypeRef.current.style.color = "#000000"
        break;
    }
  },[type])
  
  return (
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
        <span ref={wineTypeRef}>
          {type}
        </span>
        <span className={styles.winery}>{`[Winery] ${winery}`}</span>
        <span className={styles.wine}>{wine}</span>
        <span className={styles.price}>{numeral(price).format(0,0)}원</span>
      </div>
    </div>
  )
}
