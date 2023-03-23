import { useState, useEffect, useRef, useCallback } from 'react'

const useInfiniteScroll = targetEl => {
  const observerRef = useRef<IntersectionObserver>(null)
  const [intersecting, setIntersecting] = useState<boolean>(false)

  const getObserver = useCallback(() => {
    // useCallback hook에서 값을 보장해주기 위해서 useRef 사용
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(entries => {
        setIntersecting(
        // 없으면 intersecting false, 있으면 intersecting true
        entries.some(entry => entry.isIntersecting)
      )}
    )}

    return observerRef.current
  }, [observerRef])

  useEffect(() => {
    if (targetEl.current) getObserver().observe(targetEl.current)
    return () => {
      getObserver().disconnect()
    }
  }, [getObserver, targetEl])

  return intersecting
}

export default useInfiniteScroll