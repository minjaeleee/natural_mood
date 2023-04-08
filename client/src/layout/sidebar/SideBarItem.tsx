import { Fragment } from 'react'
import { useRouter } from '../../useHook/useRouter'
import { IRouterChildren } from '../../types/sidebar'

import styles from './SideBarItem.module.scss'

interface IProps {
  sideItems: IRouterChildren[],
  sideBarPath:  string
}

export const SideBarItem = ({sideItems, sideBarPath}: IProps) => {
 const{ routeTo, currentPath } = useRouter()

  return (
    <>
      {
        sideItems.map(item =>
          item.childrenSideBar &&
          <Fragment key={item.path}>
            <li 
              className={`${currentPath.includes(sideBarPath) ? styles.selectedWrapper: styles.itemWrapper}`}
            >
              <span
                className={`${styles.item} ${currentPath.includes(item.path) ? styles.selected : ''}`} 
                onClick={ () => routeTo(item.path) }
              > 
                {item.label} 
              </span>
            </li>
          </Fragment>
          )
      }
    </>
  )
}
