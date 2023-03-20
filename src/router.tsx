import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { routerData } from "./routerData";

export const router = createBrowserRouter(
  routerData.map(router => {
    return {
      path: router.path,
      element: <Layout> {router.element} </Layout>
    }
  })
)