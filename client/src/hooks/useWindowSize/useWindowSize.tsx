import { useState, useEffect, useCallback } from 'react'

export const useWindowSize = () => {
  const getWidth = () => window.innerWidth
  const getHeight = () => window.innerHeight

  const [width, setWith] = useState(getWidth)
  const [height, setHeight] = useState(getHeight)

  const onSizeChange = useCallback(() => {
    setWith(getWidth)
    setHeight(getHeight)
  }, [width, height])

  useEffect((): any => {
    window.addEventListener('resize', onSizeChange)
    return () => window.removeEventListener('resize', onSizeChange)
  }, [])

  return { height, width }
}
