import { Article } from "./pages/Article";
import { Cart } from "./pages/CartPage";
import { Review } from "./pages/Review";
import { IRouterChildren } from "./types/sidebar";
import { TotalWineList } from "./pages/List/TotalWineList";
import { RedWine } from "./pages/List/RedWine";
import { WhiteWine } from "./pages/List/WhiteWine";
import { SparklingWine } from "./pages/List/SparklingWine";
import { RoseWine } from "./pages/List/RoseWine";
import { PortWine } from "./pages/List/PortWine";
import { DessertWine } from "./pages/List/DessertWine";
import { ListPage } from "./pages/ListPage";
import { Home } from "./pages/Home";
import { Login } from "./pages/Auth/Login";
import { SignUp } from "./pages/Auth/SignUp";

interface IRouterData {
  id: number, // 고유 id
  path: string, // 페이지 경로
  label: string, // 페이지 이름
  element: React.ReactNode // 페이지 엘리먼트
  isSideBar: boolean // 네비게이션 바에 포함 여부,
  isAdminPage: boolean // 관리자 페이지 여부,
  withAuth: boolean // 로그인 인증 여부
  children?: IRouterChildren[]
}

export const routerData: IRouterData[] = [
  {
    id: 0,
    path: "/",
    label: "Home",
    element: <Home/>,
    isSideBar: false,
    isAdminPage: false,
    withAuth: false,
    children: [
      {
        path: 'login',
        label: '로그인',
        element: <Login/>
      },
      {
        path: 'sign-up',
        label: '회원가입',
        element: <SignUp/>
      },
    ]
  },
  {
    id: 1,
    path: "/beverage",
    label: "와인",
    element: <ListPage/>,
    isSideBar: true,
    isAdminPage: false,
    withAuth: false,
    children: [
      {
        path: 'all',
        label: '전체',
        element: <TotalWineList/>
      },
      {
        path: 'reds',
        label: '레드 와인',
        element: <RedWine/>
      },
      {
        path: 'whites',
        label: '화이트 와인',
        element: <WhiteWine/>
      },
      {
        path: 'sparkling',
        label: '스파클링 와인',
        element: <SparklingWine/>
      },
      {
        path: 'rose',
        label: '로제 와인',
        element: <RoseWine/>
      },
      {
        path: 'port',
        label: '포트 와인',
        element: <PortWine/>
      },
      {
        path: 'dessert',
        label: '디저트 와인',
        element: <DessertWine/>
      },
    ]
  },
  {
    id: 2,
    path: "/article",
    label: "아티클",
    element: <Article/>,
    isSideBar: true,
    isAdminPage: false,
    withAuth: false,
  },
  {
    id: 3,
    path: "/review",
    label: "고객후기",
    element: <Review/>,
    isSideBar: true,
    isAdminPage: false,
    withAuth: false,
  },
  {
    id: 4,
    path: "/cart",
    label: "장바구니",
    element: <Cart/>,
    isSideBar: true,
    isAdminPage: false,
    withAuth: false,
  },

]