import { IAmend } from '../../../../../interfaces'

/**
 * Return the right icon depending on the result of the vote
 * @param amend current amend
 */
export const getIconFromResult = (amend: IAmend) =>
  amend.conflicted ? 'fa-times' : amend.accepted ? 'fa-check' : 'fa-times'
/**
 * Return the right text color depending on the result of the vote
 * @param amend current Amend
 */
export const getColorTextFromResult = (amend: IAmend) =>
  amend.conflicted
    ? 'has-text-dark'
    : amend.accepted
    ? 'has-text-success'
    : 'has-text-danger'

/**
 * Return the right color depending on the result of the vote
 * @param amend current amend
 */
export const getColorFromResult = (amend: IAmend) =>
  amend.conflicted
    ? 'hsl(0, 0%, 21%)'
    : amend.accepted
    ? 'hsl(141, 71%, 48%)'
    : 'hsl(348, 100%, 61%)'

/**
 * Return the right text depending on the result of the vote
 * @param amend current amend
 */
export const getTextFromResult = (amend: IAmend) =>
  amend.conflicted
    ? "refusé à cause d'un conflit technique"
    : amend.accepted
    ? 'accepté par les participants'
    : 'refusé par les participants'

/**
 * Return the right style depending on the result
 * @param amend current Amend
 */
export const getStyleAmendAccepted = (amend: IAmend) =>
  !amend.conflicted && amend.accepted
    ? {
        marginRight: '0.4em',
        background: 'hsl(217, 71%, 53%, 20%)',
        borderRadius: '50%',
        height: '2.3rem',
        width: '2.3rem'
      }
    : {
        marginRight: '0.1em',
        height: '2.3rem',
        width: '2.3rem'
      }

/**
 * Return the right style depending on the result
 * @param amend current Amend
 */
export const getStyleAmendDecline = (amend: IAmend) =>
  !amend.conflicted && !amend.accepted
    ? {
        marginRight: '0.3em',
        background: 'hsl(348, 100%, 61%, 20%)',
        borderRadius: '50%',
        height: '2.3rem',
        width: '2.3rem'
      }
    : {
        marginRight: '0.1em',
        height: '2.3rem',
        width: '2.3rem'
      }
