import {useDispatch} from 'react-redux'
import {AiOutlineHeart} from 'react-icons/ai'
import { increase } from '../../store/modules/cart'

import styles from './ListItem.module.scss'

export const ListItem = ({image, title,info, price, fetchMoreEl}) => {
  const dispatch = useDispatch()
  const handleErrorImg = (e) => {
    e.target.src = "/img/default.jpg"
  }
  const onClickHeart = (title: string) => {
    dispatch(increase(title))
  }
  return (
    <div>
      <section className={styles.itemWrapper}>
        <div className={styles.items}>
          <div className={styles.imgBox}>
          {/* https://www.builder.io/blog/fast-images?_host=www.builder.io */}
            <img
              className={styles.img}
              onError={handleErrorImg}
              sizes="(max-width: 800px) 100vw, 50vw"
              loading="lazy"
              decoding='async'
              src={image}
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
      </section>
      <div ref={fetchMoreEl} style={{height:"200px"}}/>
    </div>
  )
}
