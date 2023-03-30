import { createBrowserRouter } from "react-router-dom"
import { Layout } from "./layout/Layout"
import { routerData } from "./routerData"
import { IRouterChildren } from "./types/sidebar"

interface ISidebarContent {
  id: number,
  path: string,
  label: string
  isSideBar: boolean,
  sideBarItem?: IRouterChildren[]
}

export const router = createBrowserRouter(
  routerData.map(route => {
    if(route.withAuth) {
      return {
        path: route.path,
        element: <Layout> {route.element} </Layout>,
      }
    } 

    if(route.children) {
      return {
        path: route.path,
        element: <Layout> {route.element} </Layout>,
        children: route.children
      }
    }

    return {
      path: route.path
    }
  })
)

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