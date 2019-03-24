import { useState, useEffect, useCallback, useRef } from 'react'

export const useComponentSize = () => {
  const ref = useRef<any>()

  const getSize = () =>
    !ref.current
      ? { width: 0, height: 0 }
      : {
          width: ref.current.offsetWidth,
          height: ref.current.offsetHeight
        }

  const [width, setWidth] = useState(getSize().width)
  const [height, setHeight] = useState(getSize().height)

  const onSizeChange = useCallback(() => {
    setWidth(getSize().width)
    setHeight(getSize().height)
  }, [width, height])

  useEffect((): any => {
    if (!ref.current) {
      return
    } else {
      if (width === 0 && height === 0) {
        setWidth(getSize().width)
        setHeight(getSize().height)
      }
      window.addEventListener('resize', onSizeChange)
      return () => window.removeEventListener('resize', onSizeChange)
    }
  }, [ref.current])

  return { height, width, ref }
}
