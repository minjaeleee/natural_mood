import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { routerData } from "./routerData";

interface ISidebarContent {
  id: number,
  path: string,
  label: string
  isSideBar: boolean;
}

export const router = createBrowserRouter(
  routerData.map(router => {
      return {
        path: router.path,
        element: <Layout isSideBar={router.isSideBar}> {router.element} </Layout>
      }
  })
)

export const SidebarContent: ISidebarContent[] = routerData.reduce((prev, router) => {
  return [
    ...prev,
    {
      id: router.id,
      path: router.path,
      label: router.label,
      isSideBar: router.isSideBar
    }
  ]
}, [] as ISidebarContent[])