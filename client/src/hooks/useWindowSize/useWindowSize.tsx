import { useState, useEffect, useCallback } from 'react'

export const useWindowSize = () => {
  const isUser = typeof window === 'object'

  const getSize = useCallback(() => {
    return {
      width: isUser ? window.innerWidth : undefined,
      height: isUser ? window.innerHeight : undefined
    }
  }, [isUser])

  const [windowSize, setWindowSize] = useState(getSize)

  const onSizeChange = useCallback(() => setWindowSize(getSize()), [])

  useEffect((): any => {
    if (!isUser) {
      return
    }
    window.addEventListener('resize', onSizeChange)
    return () => window.removeEventListener('resize', onSizeChange)
  }, [])

  return windowSize
}
