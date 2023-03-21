import { IBeverageType } from '../../types/beverage'

import styles from './TypeList.module.scss'

export const TypeList = ({typeList}) => {
  return (
    <ul className={styles.wrapper}>
      {
        typeList.map((type:IBeverageType) => {
          const {label, src, alt} = type
          return (
            <li className={styles.list}>
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
  )
}
