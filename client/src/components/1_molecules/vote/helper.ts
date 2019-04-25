import { IAmend } from '../../../../../interfaces'

/**
 * Return props for the button and icon depending on the user vote
 * @param isVoteUpInAmend Tell if the user has voted up
 * @param amend Current Amend
 */
export const getPropsVoteUp = (
  isVoteUpInAmend: boolean,
  amend: IAmend
): {
  button: { className: string; style: any; disabled: boolean }
  icon: {
    type: 'solid' | 'regular' | 'light' | 'brands'
    name: string
    className: string
    style: any
  }
} => ({
  button: {
    className: `${
      isVoteUpInAmend ? 'has-text-link' : 'has-text-grey-light'
    } no-focus-outlined`,
    style: {
      border: 'none',
      padding: '0 1.5rem 0 0',
      backgroundColor: 'transparent'
    },
    disabled: amend.closed
  },
  icon: {
    type: 'solid',
    name: `fa-check`,
    className: 'fa-lg',
    style: {
      background: isVoteUpInAmend ? 'hsl(217, 71%, 53%, 20%)' : 'none',
      borderRadius: '50%',
      height: '2.3rem',
      width: '2.3rem'
    }
  }
})

/**
 * Return props for the button and icon depending on the user vote
 * @param isVoteDownInAmend Tell if the user has voted down
 * @param amend Current Amend
 */
export const getPropsVoteDown = (
  isVoteDownInAmend: boolean,
  amend: IAmend
): {
  button: { className: string; style: any; disabled: boolean }
  icon: {
    type: 'solid' | 'regular' | 'light' | 'brands'
    name: string
    className: string
    style: any
  }
} => ({
  button: {
    className: `${
      isVoteDownInAmend ? 'has-text-danger' : 'has-text-grey-light'
    } no-focus-outlined`,
    style: {
      border: 'none',
      padding: '0',
      backgroundColor: 'transparent'
    },
    disabled: amend.closed
  },
  icon: {
    type: 'solid',
    name: `fa-times`,
    className: 'fa-lg',
    style: {
      background: isVoteDownInAmend ? 'hsl(348, 100%, 61%, 20%)' : 'none',
      borderRadius: '50%',
      height: '2.3rem',
      width: '2.3rem'
    }
  }
})
