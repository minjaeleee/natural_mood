import { SidebarContent } from "../router"
import { useRouter } from "../useHook/useRouter"

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
          <li 
            key={menu.path}
            className={`${styles.menu} ${currentPath === menu.path ? styles.selected : ''} `}
            onClick={()=> onClickSideBarContent(menu.path)}
            >
            {menu.label}
          </li>
       )
    }
      </ul>
    </div>
  )
}
