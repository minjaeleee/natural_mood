import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { getSingletWine } from '../../api/wineAPI'
import { IWine } from '../../types/beverage'
import { useFilterType } from '../../useHook/useFilterType'
import useInfiniteScroll from '../../useHook/useInfiniteScroll'
import { WineListLayout } from './WineListLayout'

export const RedWine = () => {
  const {search} = useLocation()
  const params = new URLSearchParams(search)
  const limits =  params.get('_limits')
  const sorting = params.get('_sorting')
  const order = params.get('_order')
  // redux-persist로 기본값 변경해야함
  const [data, setData] = useState<IWine | []>([])
  const fetchMoreEl = useRef<HTMLDivElement | null>(null)
  const intersecting = useInfiniteScroll(fetchMoreEl)
  // const fetchSingleWineAPI = useCallback(async(from:number, size:number)=>{
  //   const getData = await getSingletWine('reds', from, size)
  //   // if(from === 0) {
  //   //   setData(getData)
  //   // } else {
  //   //   setData(prev => [...prev, ...getData])
  //   // }
  // },[search])

  // useEffect(()=>{
  //   // 무한 스크롤 
  //   if(data?.length > 0 && intersecting) {
  //         fetchSingleWineAPI(data?.length, data.length+20)
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[intersecting])

  // useEffect(()=>{
  //   fetchSingleWineAPI(0,20)
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[search])

  return (
    // <WineListLayout 
    //   fetchMoreEl={fetchMoreEl}
    // />
    <div>ddd</div>
  )
}
