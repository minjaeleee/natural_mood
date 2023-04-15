import { IRouterChildren } from '../../types/sidebar'
import { routerData } from '../../routerData'

interface ISidebarContent {
  id: number,
  path: string,
  label: string
  isSideBar: boolean,
  sideBarItem?: IRouterChildren[]
}


export const SidebarContent: ISidebarContent[] = routerData.reduce((prev, router) => {
  if(router.children) {
    return [
      ...prev,
      {
        id: router.id,
        path: router.path,
        label: router.label,
        isSideBar: router.isSideBar,
        sideBarItem: router.children
      }
    ]
  }
  
  return [
    ...prev,
    {
      id: router.id,
      path: router.path,
      label: router.label,
      isSideBar: router.isSideBar,
    }
  ]
}, [] as ISidebarContent[])