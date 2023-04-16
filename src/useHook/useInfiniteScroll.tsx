import { useState, useEffect, useRef, useCallback } from 'react'

export const useInfiniteScroll = targetEl => {
  const observerRef = useRef<IntersectionObserver>(null)
  const [intersecting, setIntersecting] = useState<boolean>(false)

  const getObserver = useCallback(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(entries => {
        setIntersecting(
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