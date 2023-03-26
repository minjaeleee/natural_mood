import {useDispatch} from 'react-redux'
import {AiOutlineHeart} from 'react-icons/ai'
import { increase } from '../../store/modules/cart'
import { IWine } from '../../types/wine'

import styles from './ListItem.module.scss'

export const ListItem:React.FC<IWine> = ({id,image, wine, winery, price}) => {
  const dispatch = useDispatch()
  const handleErrorImg = (e) => {
    e.target.src = "/img/default.jpg"
  }
  const onClickHeart = (wine: string) => {
    dispatch(increase(wine))
  }
  console.log("price", price)
  return (
    <div className={styles.item}>
      <div className={styles.imgBox}>
      {/* https://www.builder.io/blog/fast-images?_host=www.builder.io */}
        <img
          className={styles.img}
          onError={handleErrorImg}
          sizes="(max-width: 800px) 100vw, 50vw"
          loading="lazy"
          decoding='async'
          src={image}
          alt={wine}
        />
      {/* 찜하기 기능 여기서 구현해보고 이후 장바구니 구현하자. */}
      <AiOutlineHeart onClick={() => onClickHeart(wine)}/>        
      </div>
      <div className={styles.itemDesc}>
        <span className={styles.wine}>{wine}</span>
        <span className={styles.winery}>{winery}</span>
        <span className={styles.price}>{price}</span>
      </div>
    </div>
  )
}
