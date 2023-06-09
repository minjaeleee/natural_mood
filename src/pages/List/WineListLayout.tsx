import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useLocation } from 'react-router-dom'

import { ListItem } from './ListItem'
import { getSingletWine } from '../../api/wineAPI'
import { IWine, IWineSingleApiOpt } from '../../types/wine'
import { useInfiniteScroll } from '../../useHook/useInfiniteScroll'
import { useRouter } from '../../useHook/useRouter'

import styles from './WineListLayout.module.scss'

interface IProps {
  value: string,
  label: string
}

export const WineListLayout = ({value, label}: IProps) => {
  const {search} = useLocation()
  const params = new URLSearchParams(search)
  const orderParams: string = params.get('_order')
  // redux-persist로 기본값 변경해야함
  const [data, setData] = useState<IWine[] | []>([])
  const fetchMoreEl = useRef<HTMLDivElement | null>(null)
  const intersecting = useInfiniteScroll(fetchMoreEl)
  const { routeTo } = useRouter()

  const fetchData = useCallback(async(order:string, start?: number)=>{
    const options: IWineSingleApiOpt = {
      value,
      order,
    }
    if(start) {
      options["start"] = start
      const getData = await getSingletWine(options)
      setData(prev => [...prev, ...getData])
    } else {
      const getData = await getSingletWine(options)
      setData(prev => [...getData])
    }
  },[value])

  useEffect(()=>{
    // 무한 스크롤 
    if(data.length >= 100) return;
    if(data?.length > 0 && intersecting) {
      fetchData(orderParams || "asc", data?.length )
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[intersecting])

  useEffect(()=>{
    fetchData(orderParams || "asc")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[search])

  const onClickSorting = (arg:string) => {
    params.set('_order', arg)
    routeTo(`?${params.toString()}`)
  }

  return (
    <div>
      <header className={styles.header}>
        <h1>{label}</h1>
      </header>
      <section className={styles.itemNavWrapper}>
        <div>총 <span className={styles.highlightingNum}>100</span> 개</div>
        <ul className={styles.itemSort}>
          <li 
            className={`${orderParams === "desc" ? styles.checkedOrder:""}`}
            onClick={()=>onClickSorting("desc")}>높은 가격순</li>
          <li 
            className={`${orderParams === "desc" ? "": styles.checkedOrder}`}
            onClick={()=>onClickSorting("asc")}>낮은 가격순</li>
        </ul>
      </section>
      <main className={styles.itemWrapper}>
        {
          data?.length > 0
          ? data.map((element:IWine) => <ListItem key={element.image + element.wine} {...{...element}} /> )
          : <div>loading...</div>
        }
      </main>
      <div ref={fetchMoreEl} style={{ height: "200px" }} />
    </div>
  )
}
