import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { getSingletWine } from '../../api/wineAPI'
import { IWine, IWineApiOpt } from '../../types/wine'
import useInfiniteScroll from '../../useHook/useInfiniteScroll'
import { ListItem } from './ListItem'

import styles from './WineListLayout.module.scss'

export const WineListLayout = ({value, label}) => {
  const {search} = useLocation()
  const params = new URLSearchParams(search)
  // redux-persist로 기본값 변경해야함
  const [data, setData] = useState<IWine[] | []>([])
  const fetchMoreEl = useRef<HTMLDivElement | null>(null)
  const intersecting = useInfiniteScroll(fetchMoreEl)

  const fetchData = useCallback(async(order:string, start?: number)=>{
    const options: IWineApiOpt = {
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
    const order = params.get('_order')
    if(data.length >= 100) return;
    if(data?.length > 0 && intersecting) {
      fetchData(order || "asc", data?.length )
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[intersecting])

  useEffect(()=>{
    const order = params.get('_order')
    fetchData(order || "asc")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[search])

  return (
    <div>
      <section className={styles.itemNavWrapper}>
        <div>총 100개</div>
          <ul className={styles.itemSort}>
            <li>높은 가격순</li>
            <li>낮은 가격순</li>
          </ul>
      </section>
      <section className={styles.itemWrapper}>
        {
          data?.length > 0
          ? data.map(element => <ListItem key={element.image + element.wine} {...{...element, fetchMoreEl}} /> )
          : <div>loading...</div>
        }
      </section>
      <div ref={fetchMoreEl} style={{ height: "200px" }} />
    </div>
  )
}
