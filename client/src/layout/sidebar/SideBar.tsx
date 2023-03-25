import { Fragment } from 'react'
import { SidebarContent } from '../../router'
import { useRouter } from '../../useHook/useRouter'
import { SideBarItem } from './SideBarItem'

import styles from'./SideBar.module.scss'

export const SideBar = () => {
  const {currentPath, routeTo} = useRouter()

  const onClickSideBarContent = (path:string) => {
    routeTo(path)
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
                onClick={()=> onClickSideBarContent(menu.path)}
                >
                {menu.label}
              </li>
              {menu.sideBarItem && <SideBarItem sideItems={menu.sideBarItem}/>}
            </Fragment>
          )
        }
      </ul>
    </div>
  )
}
