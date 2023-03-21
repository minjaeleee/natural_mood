import { useEffect, useState } from "react"
import { getBeer } from "../../api/beverage"
import { IBeer, IBeverageType } from "../../types/beverage"
import { useRouter } from "../../useHook/useRouter"
import { TypeList } from "./TypeList"

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
  const [data, setData] = useState<IBeer | []>([])
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
  
  console.log("data",data)
  return (   
      <div>
        <aside>
          <h1>어떤 맥주를 찾으시나요?</h1>
          <TypeList typeList={beerTypes}/>
        </aside>
      </div>
  )
}
