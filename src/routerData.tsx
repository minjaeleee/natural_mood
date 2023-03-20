import { Article } from "./pages/Article";
import { Cart } from "./pages/Cart";
import { Home } from "./pages/Home";
import { ListPage } from "./pages/ListPage";
import { Review } from "./pages/Review";

interface IRouterData {
  id: number, // 고유 id
  path: string, // 페이지 경로
  label: string, // 페이지 이름
  element: React.ReactNode // 페이지 엘리먼트
  isNavBar: boolean // 네비게이션 바에 포함 여부
}

export const routerData: IRouterData[] = [
  {
    id: 0,
    path: "/",
    label: "Home",
    element: <Home/>,
    isNavBar: false
  },
  {
    id: 1,
    path: "/beverage",
    label: "식음료",
    element: <ListPage/>,
    isNavBar: true
  },
  {
    id: 2,
    path: "/article",
    label: "아티클",
    element: <Article/>,
    isNavBar: true
  },
  {
    id: 3,
    path: "/review",
    label: "고객후기",
    element: <Review/>,
    isNavBar: true
  },
  {
    id: 2,
    path: "/cart",
    label: "장바구니",
    element: <Cart/>,
    isNavBar: true
  },
]