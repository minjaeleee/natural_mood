import { useCallback, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import { wineTypes } from "./WineTypesData"
import { ListItem } from "./ListItem"
import { TypeList } from "./TypeList"
import { getMultiWine } from "../../api/wineAPI"
import { IWine, IWineMultiApiOpt } from "../../types/wine"
import { useFilterType } from "../../useHook/useFilterType"

import styles from './TotalWineList.module.scss'

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

  const selectedWineLabels: string[] = getQueryStringValue ? wineTypes.filter(el => getQueryStringValue.includes(el.type)).map(el => el.label) : ['레드 와인']

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