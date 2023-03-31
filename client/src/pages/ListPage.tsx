import React, { useEffect } from 'react'
import { useRouter } from '../useHook/useRouter'

export const ListPage = () => {
  const { routeTo } = useRouter()
  useEffect(()=>{
    routeTo('/beverage/all')
  },[])
  return (
    <div></div>
  )
}
