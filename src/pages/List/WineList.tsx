import { useEffect, useState } from "react"
import { getWine } from "../../api/beverage"
import { IWine, IBeverageType } from "../../types/beverage"
import { ListItem } from "./ListItem"
// import {FaWineGlassAlt} from 'react-icons/fa'
import { TypeList } from "./TypeList"

import styles from './WineList.module.scss'

export const wineTypes: IBeverageType[] = [
  {
    id: 0,
    label: '레드 와인',
    src: '/img/red-wine.jpg',
    alt: 'red wine'
  },
  {
    id: 1,
    label: '화이트 와인',
    src: '/img/white-wine.jpg',
    alt: 'white wine'
  },
  {
    id: 2,
    label: '로제 와인',
    src: '/img/rose-wine.jpg',
    alt: 'rose wine'
  },
  {
    id: 3,
    label: '스파클링 와인',
    src: '/img/sparkling-wine.jpg',
    alt: 'sparkling wine'
  },
  {
    id: 4,
    label: '포트 와인',
    src: '/img/port-wine.jpg',
    alt: 'port wine'
  },
  {
    id: 5,
    label: '디저트',
    src: '/img/dessert.jpg',
    alt: 'dessert'
  },
]

export const WineList = () => {
  const [data, setData] = useState<IWine[] | []>([])
  // const {currentPath} = useRouter()
  // const types = ['beers', 'wines', 'coffee']
  // const pathArray = currentPath.split('/')
  // const lastPath = pathArray[pathArray.length-1]

  useEffect(()=>{
    ( 
      async()=>{
        // const getWineData = await getBeer(types.includes(lastPath) ? lastPath : null)
        const getWineData = await getWine(null)
        setData(getWineData)
      }
    )()
  },[])

  return (   
      <div>
        <TypeList title={"와인"} typeList={wineTypes}/>
        <h1 className={styles.header}> 레드와인을 알아봐요 </h1>
        <section className={styles.itemWrapper}>
          {
            data?.map((el:IWine) => {
              return (
                  <ListItem 
                    key={el.image+el.wine}
                    src={el.image}
                    title={el.wine} 
                    info={el.winery} 
                    options={el.rating} 
                  /> 
              )
            })
          }
        </section>
      </div>
  )
}