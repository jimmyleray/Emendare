import { useState, useEffect, useCallback } from 'react'

export const useWindowSize = () => {
  const [windowWidth, setWindowWith] = useState(window.innerWidth)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)

  const onSizeChange = useCallback(() => {
    setWindowWith(window.innerWidth)
    setWindowHeight(window.innerHeight)
  }, [])

  useEffect((): any => {
    window.addEventListener('resize', onSizeChange)
    return () => window.removeEventListener('resize', onSizeChange)
  }, [])

  return { windowHeight, windowWidth }
}
