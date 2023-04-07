import { Fragment } from 'react'
import { SidebarContent } from '../../router'
import { useRouter } from '../../useHook/useRouter'
import { SideBarItem } from './SideBarItem'
import { IRouterChildren } from '../../types/sidebar'

import styles from'./SideBar.module.scss'

export const SideBar = () => {
  const {currentPath, routeTo} = useRouter()

  const onClickSideBarContent = (path:string, sideBarItem:IRouterChildren[] | undefined) => {
    if(!sideBarItem || !sideBarItem[0].childrenSideBar) return routeTo(path)
    routeTo(`${path}/${sideBarItem[0]?.path}`)
  }

  return (
    <div className={styles.sideBar}>
      <ul>
        {
          SidebarContent.map(menu => 
            menu.isSideBar &&
            <Fragment key={menu.path}>
              <li 
                className={`${styles.menu} ${currentPath.includes(menu.path) ? styles.selected : ''} `}
                onClick={()=> onClickSideBarContent(menu.path, menu.sideBarItem)}
                >
                {menu.label}
              </li>
              {menu.sideBarItem && <SideBarItem sideItems={menu.sideBarItem} sideBarPath={menu.path}/>}
            </Fragment>
          )
        }
      </ul>
    </div>
  )
}
