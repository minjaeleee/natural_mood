import { useCallback, useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import { getMultiWine, getSingletWine } from "../../api/wineAPI"
import { IWine, IWineMultiApiOpt, IWineSingleApiOpt, IWineType } from "../../types/wine"
import { useFilterType } from "../../useHook/useFilterType"
import useInfiniteScroll from "../../useHook/useInfiniteScroll"
import { ListItem } from "./ListItem"
import { TypeList } from "./TypeList"

import styles from './TotalWineList.module.scss'

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

export const TotalWineList = () => {
  const [data, setData] = useState<IWine[] | []>([])
  const {search} = useLocation()
  const {getQueryStringValue} = useFilterType({search})

  const fetchMultiWineAPI = useCallback(async()=>{
    const wineApiOpt:IWineMultiApiOpt = {
      values: getQueryStringValue || ['reds']
    }
      const getData = await getMultiWine(wineApiOpt)
      setData(prev => [...getData])
  },[getQueryStringValue])

  useEffect(()=>{
    fetchMultiWineAPI()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[search])

  const selectedWineLabels = getQueryStringValue ? wineTypes.filter(el => getQueryStringValue.includes(el.type)).map(el => el.label) : ['레드 와인']

  return (   
      <div>
        <TypeList title={"와인"} typeList={wineTypes} selectedWineLabels={selectedWineLabels}/>
        <header className={styles.header}>
          <h1 className={styles.title}> 어떤 와인을 알아볼까요? </h1>
          <h3 className={styles.subtitle}>
            {selectedWineLabels.map((label,idx)=> <span key={label+idx}>{` ${label} ${idx !== selectedWineLabels.length -1 ? '/' : ''}`}</span>)}
            <span className={styles.subtitleHighlighting}>{` 최저가 `}</span>
             15종을 준비했어요.
          </h3>
        </header>
        <main className={styles.itemWrapper}>
        {
          data?.length > 0
          ? data.map((element:IWine) => <ListItem key={element.image + element.wine} {...{...element}} /> )
          : <div>loading...</div>
        }
      </main>
      </div>
  )
}