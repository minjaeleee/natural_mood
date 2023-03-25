import {useDispatch} from 'react-redux'
import {AiOutlineHeart} from 'react-icons/ai'

import styles from './ListItem.module.scss'
import { increase } from '../../store/modules/cart'

export const ListItem = ({src, title,info, options}) => {
  const dispatch = useDispatch()
  const handleErrorImg = (e) => {
    e.target.src = "/img/default.jpg"
  }
  const onClickHeart = (title: string) => {
    dispatch(increase(title))
  }
  return (
    <div className={styles.items}>
      <div className={styles.imgBox}>
        <img
          className={styles.img}
          onError={handleErrorImg}
          src={src}
          alt={title}
        />
      {/* 찜하기 기능 여기서 구현해보고 이후 장바구니 구현하자. */}
      <AiOutlineHeart onClick={() => onClickHeart(title)}/>        
      </div>
      <div className={styles.itemDesc}>
        <span className={styles.title}>{title}</span>
        <span className={styles.info}>{info}</span>
      </div>
    </div>
  )
}
