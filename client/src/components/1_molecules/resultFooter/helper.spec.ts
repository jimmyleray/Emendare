import { getPropsAmendAccepted, getPropsAmendDecline } from './helper'
import { amendMock } from '../../../../../interfaces'

describe('getPropsAmendAccepted', () => {
  it('shoudl return the right object', () => {
    expect(
      getPropsAmendAccepted({
        ...amendMock,
        results: {
          upVotesCount: 10,
          downVotesCount: 5,
          indVotesCount: 1,
          totalPotentialVotesCount: 16
        }
      })
    ).toMatchObject({
      div: {
        className: 'has-text-link no-focus-outlined',
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
          background: 'hsl(217, 71%, 53%, 20%)',
          borderRadius: '50%',
          height: '2.3rem',
          width: '2.3rem',
          marginLeft: 'calc(-.375em - 1px)',
          marginRight: '.1875em'
        }
      }
    })
  })

  expect(
    getPropsAmendAccepted({
      ...amendMock,
      results: {
        upVotesCount: 1,
        downVotesCount: 5,
        indVotesCount: 1,
        totalPotentialVotesCount: 16
      }
    })
  ).toMatchObject({
    div: {
      className: 'has-text-grey-light no-focus-outlined',
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
        background: 'none',
        borderRadius: '50%',
        height: '2.3rem',
        width: '2.3rem',
        marginLeft: 'calc(-.375em - 1px)',
        marginRight: '.1875em'
      }
    }
  })
})

describe('getPropsAmendDecline', () => {
  it('shoudl return the right object', () => {
    expect(
      getPropsAmendDecline({
        ...amendMock,
        results: {
          upVotesCount: 1,
          downVotesCount: 5,
          indVotesCount: 1,
          totalPotentialVotesCount: 16
        }
      })
    ).toMatchObject({
      div: {
        className: 'has-text-danger no-focus-outlined',
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
          background: 'hsl(348, 100%, 61%, 20%)',
          borderRadius: '50%',
          height: '2.3rem',
          width: '2.3rem',
          marginLeft: 'calc(-.375em - 1px)',
          marginRight: '.1875em'
        }
      }
    })

    expect(
      getPropsAmendDecline({
        ...amendMock,
        results: {
          upVotesCount: 10,
          downVotesCount: 5,
          indVotesCount: 1,
          totalPotentialVotesCount: 16
        }
      })
    ).toMatchObject({
      div: {
        className: 'has-text-grey-light no-focus-outlined',
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
          background: 'none',
          borderRadius: '50%',
          height: '2.3rem',
          width: '2.3rem',
          marginLeft: 'calc(-.375em - 1px)',
          marginRight: '.1875em'
        }
      }
    })
  })
})
