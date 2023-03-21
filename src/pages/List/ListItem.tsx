import { IWine } from "../../types/beverage"
import styles from './ListItem.module.scss'

type dataType = IWine

export const ListItem = ({data}) => {
  return (
    <>
      <section>
        <h1 className={styles.header}> 레드와인을 알아봐요 </h1>
        <h3> 고기랑 먹으면 맛있어요와 같은 description도 넣어줄까해요 </h3>
      </section>
      <section className={styles.itemWrapper}>
        {data.map((beverage:IWine) => {
          console.log(beverage)
          return (
            <div className={styles.items}>
              <img
                className={styles.img}
                src={beverage.image}
                alt={beverage.wine}
              />
              <div className={styles.itemDesc}>
                <span>{beverage.winery}</span>
                <span>{beverage.wine}</span>
                <span>{beverage.rating.average}</span>
                <span>{beverage.rating.reviews}</span>
              </div>
            </div>
          )
        })}
      </section>
    </>
  )
}
