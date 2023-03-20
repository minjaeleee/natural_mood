import { SidebarContent } from "../router"
import { useRouter } from "../useHook/useRouter"

import styles from'./NavBar.module.scss'

export const NavBar = () => {
  const {routeTo} = useRouter()

  const onClickSideBarContent = (path:string) => {
    routeTo(path)
  }

  return (
    <div className={styles.navBar}>
    {
      SidebarContent.map(menu => 
        menu.isNavBar &&
          <div 
            key={menu.path}
            className={styles.menu}
            onClick={()=>onClickSideBarContent(menu.path)}
            >
            {menu.label}
          </div>
       )
    }
    </div>
  )
}
