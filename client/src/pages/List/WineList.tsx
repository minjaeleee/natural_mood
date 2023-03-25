import { useCallback, useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import { getMultiWine, getSingletWine } from "../../api/wineAPI"
import { IWine, IBeverageType } from "../../types/beverage"
import { useFilterType } from "../../useHook/useFilterType"
import useInfiniteScroll from "../../useHook/useInfiniteScroll"
import { ListItem } from "./ListItem"
import { TypeList } from "./TypeList"

import styles from './WineList.module.scss'

export const wineTypes: IBeverageType[] = [
  {
    id: 0,
    label: '레드 와인',
    src: '/img/red-wine.jpg',
    type: 'reds',
    alt: 'red wine'
  },
  {
    id: 1,
    label: '화이트 와인',
    src: '/img/white-wine.jpg',
    type: 'whites',
    alt: 'white wine'
  },
  {
    id: 2,
    label: '로제 와인',
    src: '/img/rose-wine.jpg',
    type: 'rose',
    alt: 'rose wine'
  },
  {
    id: 3,
    label: '스파클링 와인',
    src: '/img/sparkling-wine.jpg',
    type: 'sparkling',
    alt: 'sparkling wine'
  },
  {
    id: 4,
    label: '포트 와인',
    src: '/img/port-wine.jpg',
    type: 'port',
    alt: 'port wine'
  },
  {
    id: 5,
    label: '디저트',
    src: '/img/dessert.jpg',
    type: 'dessert',
    alt: 'dessert'
  },
]

export const WineList = () => {
  // const [data, setData] = useState<IWine[] | []>([])
  // const {search} = useLocation()
  // const {getQueryStringValue} = useFilterType({search})
  // const fetchMoreEl = useRef<HTMLDivElement | null>(null)
  // const intersecting = useInfiniteScroll(fetchMoreEl)

  // const fetchSingleWineAPI = useCallback(async(from:number, size:number)=>{
  //   const getData = await getSingletWine(getQueryStringValue, from, size)
  //   if(from === 0) {
  //     setData(getData)
  //   } else {
  //     setData(prev => [...prev, ...getData])
  //   }
  // },[getQueryStringValue])

  // const fetchMultiWineAPI = useCallback(async(from:number, size:number)=>{
  //   const getData = await getMultiWine(getQueryStringValue, from, size)
  //   if(from === 0) {
  //     setData(getData)
  //   } else {
  //     setData(prev => [...prev, ...getData])
  //   }
  // },[getQueryStringValue])
  
  // useEffect(()=>{
  //   // 무한 스크롤 
  //   const singleQueryStringValue = !getQueryStringValue || getQueryStringValue?.length < 2
  //   const multiQueryStringValues = getQueryStringValue?.length > 1 
  //   if(data?.length > 0 && intersecting) {
  //     if(singleQueryStringValue) {
  //         fetchSingleWineAPI(data?.length, data.length+20)
  //       }
  //     if(multiQueryStringValues) {
  //       fetchMultiWineAPI(data?.length, data?.length+20)
  //     }
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[intersecting])

  // useEffect(()=>{
  //   const singleQueryStringValue = !getQueryStringValue || getQueryStringValue?.length < 2
  //   const multiQueryStringValues = getQueryStringValue?.length > 1 
  //   if(singleQueryStringValue) {
  //     fetchSingleWineAPI(0,20)
  //   }
  //   if(multiQueryStringValues) {
  //     fetchMultiWineAPI(0,20)
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[search])
  return (   
      <div>
        {/* <TypeList title={"와인"} typeList={wineTypes}/>
        <h1 className={styles.header}> 레드와인을 알아봐요 </h1>
        <section className={styles.itemWrapper}>
          {
            data?.length > 0
            ? data.map((el:IWine) => {
              return (
                  <ListItem 
                    key={el.image+el.wine}
                    src={el.image}
                    title={el.wine} 
                    info={el.winery} 
                  /> 
              )
            })
            : <div>loading...</div>
          }
        </section>
        <div ref={fetchMoreEl} style={{ height: "200px" }} /> */}
        ddd
      </div>
  )
}