import { useLocation } from 'react-router-dom'

import { IWineType } from '../../types/wine'
import { useFilterType } from '../../useHook/useFilterType'

import styles from './TypeList.module.scss'

interface IProps {
  title: string,
  typeList: IWineType[],
  selectedWineLabels: string[]
}

export const TypeList = ({title, typeList, selectedWineLabels}: IProps) => {
  const {search} = useLocation()
  const {handleTypeQueryString} = useFilterType({search})

  const onClickType = (type:string) => {
    handleTypeQueryString(type)
  }

  return (
    <aside className={styles.wrapper}>
      <h1 className={styles.title}> 어떤 {title}을 찾으시나요? </h1>
      <ul className={styles.itemWrapper}>
        {
          typeList.map(list => {
            const {label, src, alt, type} = list
            return (
              <li 
                className={`${styles.list} ${selectedWineLabels.includes(label) ? styles.selectedList : ""}`} 
                key={src+label}
                onClick={()=>onClickType(type)}
              >
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
