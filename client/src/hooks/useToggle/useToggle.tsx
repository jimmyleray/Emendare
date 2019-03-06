/**
 * Hook for sharing toggle logic
 */
import { useState, useCallback } from 'react'

export const useToggle = (
  initialValue: boolean = false
): { on: boolean; toggler: Function } => {
  // State
  const [on, setOn] = useState(initialValue)
  // Toggle
  const toggler = useCallback(() => setOn(oldOn => !oldOn), [])

  return { on, toggler }
}
