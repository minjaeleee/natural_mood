import { useRouter } from "./useRouter";

export const useFilterType = ({search}) => {
  const {routeTo} = useRouter()
  const getQueryString = new URLSearchParams(decodeURIComponent(search).replace(/,/g, '+'));
  const getTypeValue = getQueryString.get('type')

  const handleTypeQueryString = (type:string) => {
    if(getTypeValue) {
      const queryStringArr = getTypeValue.split(" ")
      if(queryStringArr.includes(type)) {
        // 중복 value 삭제
        const removedValue = queryStringArr.filter(value => value !== type)
        const newQueryStringValues = removedValue?.join(',')
        newQueryStringValues ? getQueryString.set('type', newQueryStringValues) : getQueryString.delete('type')
      } else {
        // value 추가
        queryStringArr.push(type)
        const newQueryStringValues = queryStringArr?.join(',')
        getQueryString.set('type', newQueryStringValues)
      }
    } else {
      getQueryString.set('type', type)
    }

    const finalQuerystring = getQueryString?.toString()
    return routeTo(`?${finalQuerystring}`)
  }

  return {
    getQueryStringValue: getTypeValue?.split(" "),
    handleTypeQueryString
  }
}
