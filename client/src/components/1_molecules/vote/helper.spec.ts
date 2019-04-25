import { getPropsVoteDown, getPropsVoteUp } from './helper'
import { amendMock } from '../../../../../interfaces'

describe('getPropsVoteDown', () => {
  it('shoudl return the right object', () => {
    expect(getPropsVoteDown(true, amendMock)).toMatchObject({
      button: {
        className: 'has-text-danger no-focus-outlined',
        style: {
          border: 'none',
          padding: '0',
          backgroundColor: 'transparent'
        },
        disabled: true
      },
      icon: {
        type: 'solid',
        name: `fa-times`,
        className: 'fa-lg',
        style: {
          background: 'hsl(348, 100%, 61%, 20%)',
          borderRadius: '50%',
          height: '2.3rem',
          width: '2.3rem'
        }
      }
    })

    expect(getPropsVoteDown(false, amendMock)).toMatchObject({
      button: {
        className: 'has-text-grey-light no-focus-outlined',
        style: {
          border: 'none',
          padding: '0',
          backgroundColor: 'transparent'
        },
        disabled: true
      },
      icon: {
        type: 'solid',
        name: `fa-times`,
        className: 'fa-lg',
        style: {
          background: 'none',
          borderRadius: '50%',
          height: '2.3rem',
          width: '2.3rem'
        }
      }
    })
  })
})

describe('getPropsVoteUp', () => {
  it('shoudl return the right object', () => {
    expect(getPropsVoteUp(true, amendMock)).toMatchObject({
      button: {
        className: 'has-text-link no-focus-outlined',
        style: {
          border: 'none',
          padding: '0 1.5rem 0 0',
          backgroundColor: 'transparent'
        },
        disabled: true
      },
      icon: {
        type: 'solid',
        name: `fa-check`,
        className: 'fa-lg',
        style: {
          background: 'hsl(217, 71%, 53%, 20%)',
          borderRadius: '50%',
          height: '2.3rem',
          width: '2.3rem'
        }
      }
    })
  })

  expect(getPropsVoteUp(false, amendMock)).toMatchObject({
    button: {
      className: 'has-text-grey-light no-focus-outlined',
      style: {
        border: 'none',
        padding: '0 1.5rem 0 0',
        backgroundColor: 'transparent'
      },
      disabled: true
    },
    icon: {
      type: 'solid',
      name: `fa-check`,
      className: 'fa-lg',
      style: {
        background: 'none',
        borderRadius: '50%',
        height: '2.3rem',
        width: '2.3rem'
      }
    }
  })
})
