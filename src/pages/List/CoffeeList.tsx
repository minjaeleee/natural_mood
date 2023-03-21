import { useEffect, useState } from "react"
import { getCoffee } from "../../api/beverage"
import { IBeverageType, IWine } from "../../types/beverage"
import { useRouter } from "../../useHook/useRouter"
import { TypeList } from "./TypeList"

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
  const [data, setData] = useState<IWine | []>([])
  // const {currentPath} = useRouter()
  // const types = ['beers', 'wines', 'coffee']
  // const pathArray = currentPath.split('/')
  // const lastPath = pathArray[pathArray.length-1]

  useEffect(()=>{
    (
      async()=>{
        // const getWineData = await getBeer(types.includes(lastPath) ? lastPath : null)
        const getWineData = await getCoffee(null)
        setData(getWineData)
      }
    )()
  },[])
  
  console.log("data",data)
  return (   
    <div>
      <aside>
        <h1>어떤 커피를 찾으시나요?</h1>
        <TypeList typeList={coffeTypes}/>
      </aside>
  </div>
  )
}