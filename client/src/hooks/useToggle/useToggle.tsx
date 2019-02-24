/**
 * Hook for sharing toggle logic
 */
import { useState, useCallback, useReducer } from 'react'

export const useToggle = (
  initialValue: boolean = false
): { on: boolean; toggler: Function } => {
  // State
  const [on, setOn] = useState(initialValue)
  const toggler = useCallback(() => setOn(!on), [on])

  return { on, toggler }
}
