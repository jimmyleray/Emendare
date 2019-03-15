import { useState, useEffect, useCallback } from 'react'

export const useWindowSize = () => {
  const getWidth = () => {
    return window.innerWidth
  }

  const getHeight = () => {
    return window.innerHeight
  }

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
