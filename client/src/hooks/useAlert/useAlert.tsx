import { useToggle } from '../../hooks'
import { useCallback } from 'react'

export const useAlert = (
  initialOn: boolean = false
): { showAlert: boolean; openAlert: any; closeAlert: any } => {
  const { on, toggler } = useToggle(initialOn)

  const openAlert = useCallback(() => {
    if (!on) {
      toggler()
    }
  }, [on])

  const closeAlert = useCallback(() => {
    if (on) {
      toggler()
    }
  }, [on])

  return { showAlert: on, openAlert, closeAlert }
}
