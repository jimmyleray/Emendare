import { IAmend } from '../../../../../interfaces'

/**
 * Return props for the div and icon depending on the result of the vote
 * @param amend Current Amend
 */
export const getPropsAmendAccepted = (
  amend: IAmend
): {
  div: { className: string; style: any }
  icon: {
    type: 'solid' | 'regular' | 'light' | 'brands'
    name: string
    className: string
    style: any
  }
} => ({
  div: {
    className: `${
      amend.results.upVotesCount > amend.results.downVotesCount
        ? 'has-text-link'
        : 'has-text-grey-light'
    } no-focus-outlined`,
    style: {
      border: 'none',
      padding: '0 1.5rem 0 0',
      backgroundColor: 'transparent'
    }
  },
  icon: {
    type: 'solid',
    name: `fa-check`,
    className: 'fa-lg',
    style: {
      background:
        amend.results.upVotesCount > amend.results.downVotesCount
          ? 'hsl(217, 71%, 53%, 20%)'
          : 'none',
      borderRadius: '50%',
      height: '2.3rem',
      width: '2.3rem',
      marginLeft: 'calc(-.375em - 1px)',
      marginRight: '.1875em'
    }
  }
})

/**
 * Return props for the div and icon depending on the result of the vote
 * @param amend Current Amend
 */
export const getPropsAmendDecline = (
  amend: IAmend
): {
  div: { className: string; style: any }
  icon: {
    type: 'solid' | 'regular' | 'light' | 'brands'
    name: string
    className: string
    style: any
  }
} => ({
  div: {
    className: `${
      amend.results.downVotesCount >= amend.results.upVotesCount
        ? 'has-text-danger'
        : 'has-text-grey-light'
    } no-focus-outlined`,
    style: {
      border: 'none',
      padding: '0',
      backgroundColor: 'transparent'
    }
  },
  icon: {
    type: 'solid',
    name: `fa-times`,
    className: 'fa-lg',
    style: {
      background:
        amend.results.downVotesCount >= amend.results.upVotesCount
          ? 'hsl(348, 100%, 61%, 20%)'
          : 'none',
      borderRadius: '50%',
      height: '2.3rem',
      width: '2.3rem',
      marginLeft: 'calc(-.375em - 1px)',
      marginRight: '.1875em'
    }
  }
})
