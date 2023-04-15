import { createBrowserRouter } from "react-router-dom"
import { Layout } from "./layout/Layout"
import { routerData } from "./routerData"

export const router = createBrowserRouter(
  routerData.map(route => {
    if(route.withAuth) {
      return {
        path: route.path,
        element: <Layout> {route.element} </Layout>,
        children: route.children
      }
    } 

    return {
      path: route.path,
      element: route.element,
      children: route.children
    }
  })
)