import { Home } from "./pages/Home";
import { ListPage } from "./pages/ListPage";

interface IRouterData {
  id: number, // 고유 id
  path: string, // 페이지 경로
  label: string, // 페이지 이름
  element: React.ReactNode // 페이지 엘리먼트
}

export const routerData: IRouterData[] = [
  {
    id: 0,
    path: "/",
    label: "Home",
    element: <Home/>,
  },
  {
    id: 1,
    path: "/list",
    label: "ListPage",
    element: <ListPage/>,
  },
]