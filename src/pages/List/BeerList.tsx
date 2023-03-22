import { useEffect, useState } from "react"
import { getBeer } from "../../api/beverage"
import { IBeer, IBeverageType } from "../../types/beverage"
import { useRouter } from "../../useHook/useRouter"
import { ListItem } from "./ListItem"
import { TypeList } from "./TypeList"

import styles from './WineList.module.scss'

export const beerTypes:IBeverageType[] = [
  {
    id: 0,
    label: '에일',
    src: '/img/ale-beer.jpg',
    alt: 'ale beer'
  },
  {
    id: 1,
    label: '흑맥주',
    src: '/img/stouts-beer.jpg',
    alt: 'stouts beer'
  },
  {
    id: 2,
    label: '레드 에일',
    src: '/img/red-ale-beer.jpg',
    alt: 're ale beer'
  },
]

export const BeerList = () => {
  const [data, setData] = useState<IBeer[] | []>([])
  // const {currentPath} = useRouter()
  // const types = ['beers', 'wines', 'coffee']
  // const pathArray = currentPath.split('/')
  // const lastPath = pathArray[pathArray.length-1]

  useEffect(()=>{
    (
      async()=>{
        // const getBeerData = await getBeer(types.includes(lastPath) ? lastPath : null)
        const getBeerData = await getBeer(null)
        setData(getBeerData)
      }
    )()
  },[])
  
  return (   
      <div>
        <TypeList title={"맥주"} typeList={beerTypes}/>
        <h1 className={styles.header}> 레드와인을 알아봐요 </h1>
        <section className={styles.itemWrapper}>
          {
            data?.map((el:IBeer) => {
              return (
                  <ListItem 
                    key={el.image+el.name}
                    src={el.image}
                    title={el.name} 
                    info={el.price} 
                    options={el.rating} 
                  /> 
              )
            })
          }
      </section>
      </div>
  )
}
