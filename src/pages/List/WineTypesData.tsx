import { IWineType } from "../../types/wine";

export const wineTypes: IWineType[] = [
  {
    id: 0,
    label: '레드 와인',
    src: '/img/red-wine.jpg',
    type: 'reds',
    alt: 'Red Wine'
  },
  {
    id: 1,
    label: '화이트 와인',
    src: '/img/white-wine.jpg',
    type: 'whites',
    alt: 'White Wine'
  },
  {
    id: 2,
    label: '로제 와인',
    src: '/img/rose-wine.jpg',
    type: 'rose',
    alt: 'Rose Wine'
  },
  {
    id: 3,
    label: '스파클링 와인',
    src: '/img/sparkling-wine.jpg',
    type: 'sparkling',
    alt: 'Sparkling Wine'
  },
  {
    id: 4,
    label: '포트 와인',
    src: '/img/port-wine.jpg',
    type: 'port',
    alt: 'Port Wine'
  },
  {
    id: 5,
    label: '디저트',
    src: '/img/dessert.jpg',
    type: 'dessert',
    alt: 'Dessert Wine'
  },
]