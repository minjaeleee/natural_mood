import { useEffect, useState } from "react"
import { getCoffee } from "../../api/beverage"
import { IBeverageType, ICoffee } from "../../types/beverage"
import { useRouter } from "../../useHook/useRouter"
import { ListItem } from "./ListItem"
import { TypeList } from "./TypeList"

import styles from'./WineList.module.scss'

export const coffeTypes: IBeverageType[] = [
  {
    id: 0,
    label: '아이스 커피',
    src: '/img/ice-coffee.jpg',
    alt: 'ice coffee'
  },
  {
    id: 1,
    label: '따뜻한 커피',
    src: '/img/hot-coffee.jpg',
    alt: 'hot coffee'
  },
]

export const CoffeeList = () => {
  const [data, setData] = useState<ICoffee[] | []>([])
  // const {currentPath} = useRouter()
  // const types = ['beers', 'wines', 'coffee']
  // const pathArray = currentPath.split('/')
  // const lastPath = pathArray[pathArray.length-1]

  useEffect(()=>{
    (
      async()=>{
        // const getCoffeeData = await getBeer(types.includes(lastPath) ? lastPath : null)
        const getCoffeeData = await getCoffee(null)
        setData(getCoffeeData)
      }
    )()
  },[])
  
  console.log("data",data)
  return (   
    <div>
      <TypeList title={"커피"} typeList={coffeTypes}/>
      <h1 className={styles.header}> 커피를 알아봐요 </h1>
      <section className={styles.itemWrapper}>
          {
            data?.map((el:ICoffee) => {
              return (
                  <ListItem 
                    key={el.image+el.id}
                    src={el.image}
                    title={el.title} 
                    info={el.description} 
                    options={null} 
                  /> 
              )
            })
          }
        </section>
  </div>
  )
}