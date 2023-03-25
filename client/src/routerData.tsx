import { Article } from "./pages/Article";
import { Cart } from "./pages/Cart";
import { Home } from "./pages/Home";
import { BeerList } from "./pages/List/BeerList";
import { CoffeeList } from "./pages/List/CoffeeList";
import { ListPage } from "./pages/ListPage";
import { WineList } from "./pages/List/WineList";
import { Review } from "./pages/Review";
import { IRouterChildren } from "./types/sidebar";
interface IRouterData {
  id: number, // 고유 id
  path: string, // 페이지 경로
  label: string, // 페이지 이름
  element: React.ReactNode // 페이지 엘리먼트
  isSideBar: boolean // 네비게이션 바에 포함 여부,
  children?: IRouterChildren[]
}

export const routerData: IRouterData[] = [
  {
    id: 0,
    path: "/",
    label: "Home",
    element: <Home/>,
    isSideBar: false
  },
  {
    id: 1,
    path: "/beverage",
    label: "식음료",
    element: <ListPage/>,
    isSideBar: true,
    children: [
      {
        path: 'wines',
        label: '와인',
        element: <WineList/>
      },
      {
        path: 'beers',
        label: '맥주',
        element: <BeerList/>
      },
      {
        path: 'coffee',
        label: '커피',
        element: <CoffeeList/>
      },
    ]
  },
  {
    id: 2,
    path: "/article",
    label: "아티클",
    element: <Article/>,
    isSideBar: true
  },
  {
    id: 3,
    path: "/review",
    label: "고객후기",
    element: <Review/>,
    isSideBar: true
  },
  {
    id: 4,
    path: "/cart",
    label: "장바구니",
    element: <Cart/>,
    isSideBar: true
  },

]