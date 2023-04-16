import { useRef } from 'react'
import { useInfiniteScroll } from '../../useHook/useInfiniteScroll'
import numeral from 'numeral'

import styles from './MoreCartInfo.module.scss'

export const MoreCartInfo = ({dataList}) => {
  const fetchMoreEl = useRef<HTMLDivElement | null>(null)
  const intersecting = useInfiniteScroll(fetchMoreEl)

  const totalPrice = dataList.data.reduce((prev, cur)=> {
    return prev + cur.totalPrice
  },0 as number)

  const freeDeliveryChargeCondition = 50000
  const needToDeliveryFree =  freeDeliveryChargeCondition - totalPrice > 0 ? freeDeliveryChargeCondition - totalPrice : 0
  const finalTotalPrice = totalPrice + (needToDeliveryFree ? 3000 : 0)

  return (
    <div className={styles.wrapper}>
      <div ref={fetchMoreEl}></div>
      <div className={`${!intersecting ? styles.slideDown : styles.innerWrapper}`}>
        <main className={styles.content}>
          <dl>
            <dt className={styles.totalPriccTerm}>총 제품금액</dt>
            <dd>{`${numeral(totalPrice).format(0,0)}원`}</dd>
          </dl>
          <dl>
            <dt className={styles.deliveryChargeTerm}>기본 배송비</dt>
            <dd>{`${needToDeliveryFree ? "3,000원" : "0원"}`}</dd>
          </dl>
          <div className={`${needToDeliveryFree ? styles.freeDeliveryChargeInfo : styles.none}`}>
            <span>
              <span className={styles.highlighting}> 
              {`+${numeral(needToDeliveryFree).format(0,0)}원`}
              </span>
                {` 추가시 무료 배송!`}
            </span>
          </div>
          <dl className={styles.finalTotalPriceLine}>
            <dt className={styles.finalTotalPriceTerm}>결제예정금액</dt>
            <dd className={styles.finalTotalPriceDesc}>{`${numeral(finalTotalPrice).format(0,0)}원`}</dd>
          </dl>
        </main>
      </div>
    </div>
  )
}
