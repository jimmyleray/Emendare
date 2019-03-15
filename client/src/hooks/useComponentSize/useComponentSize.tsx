import { useState, useEffect, useCallback, useRef } from 'react'

export const useComponentSize = () => {
  const ref: any = useRef()

  const getSize = () => {
    if (!ref.current) {
      return { width: 0, height: 0 }
    } else {
      return {
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight
      }
    }
  }

  const [width, setWidth] = useState(getSize().width)
  const [height, setHeight] = useState(getSize().height)

  const onSizeChange = useCallback(() => {
    const { width, height } = getSize()
    setWidth(width)
    setHeight(height)
  }, [width, height])

  useEffect((): any => {
    if (!ref.current) {
      return
    } else {
      if ((width && height) === 0) {
        const { width, height } = getSize()
        setWidth(width)
        setHeight(height)
      }
      window.addEventListener('resize', onSizeChange)
      return () => window.removeEventListener('resize', onSizeChange)
    }
  }, [ref.current])

  return { height, width, ref }
}
