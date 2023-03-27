import { Fragment } from 'react'
import { useRouter } from '../../useHook/useRouter'
import { IRouterChildren } from '../../types/sidebar'

import styles from './SideBarItem.module.scss'

export const SideBarItem = ({sideItems, sideBarPath}) => {
 const{ routeTo, currentPath } = useRouter()

  return (
    <>
      {
        sideItems.map((item:IRouterChildren) =>
          <Fragment key={item.path}>
            <ul 
              className={`${currentPath.includes(sideBarPath) ? styles.selectedWrapper: styles.itemWrapper}`}
            >
              <li
                className={`${styles.item} ${currentPath.includes(item.path) ? styles.selected : ''}`} 
                onClick={ () => routeTo(item.path) }
              > 
                {item.label} 
              </li>
            </ul>
          </Fragment>
          )
      }
    </>
  )
}
