import { IBeverageType } from '../../types/beverage'

import styles from './TypeList.module.scss'

export const TypeList = ({title, typeList}) => {
  return (
    <aside className={styles.wrapper}>
      <h1> 어떤 {title}을 찾으시나요? </h1>
      <ul className={styles.itemWrapper}>
        {
          typeList.map((type:IBeverageType) => {
            const {label, src, alt} = type
            return (
              <li className={styles.list} key={src+label}>
                <div className={styles.imgBox}>
                  <img
                    className={styles.img}
                    src={src}
                    alt={alt}
                  />
                </div>
                <p className={styles.label}>
                  {label}
                </p>
              </li>
              )
          })
        }
      </ul>
    </aside>
  )
}
