import { getPropsAmendDown, getPropsAmendUp } from './cardEvent'

describe('getPropsAmendDown', () => {
  it('should return the right props', () => {
    expect(getPropsAmendDown(true)).toMatchObject({
      container: {
        className: `${'has-text-danger'} no-focus-outlined`,
        style: {
          border: 'none',
          margin: '0',
          backgroundColor: 'transparent',
          paddingRight: '0'
        }
      },
      icon: {
        type: 'solid',
        name: `fa-thumbs-down`,
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

    expect(getPropsAmendDown(false)).toMatchObject({
      container: {
        className: `${'has-text-grey-light'} no-focus-outlined`,
        style: {
          border: 'none',
          margin: '0',
          backgroundColor: 'transparent',
          paddingRight: '0'
        }
      },
      icon: {
        type: 'solid',
        name: `fa-thumbs-down`,
        className: 'fa-lg',
        style: {
          background: 'hsl(0, 0%, 96%)',
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

describe('getPropsAmendUp', () => {
  it('should return the right props', () => {
    expect(getPropsAmendUp(true)).toMatchObject({
      container: {
        className: `${'has-text-link'} no-focus-outlined`,
        style: {
          border: 'none',
          margin: '0',
          backgroundColor: 'transparent',
          marginRight: '0.5rem'
        }
      },
      icon: {
        type: 'solid',
        name: `fa-thumbs-up`,
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

    expect(getPropsAmendUp(false)).toMatchObject({
      container: {
        className: `${'has-text-grey-light'} no-focus-outlined`,
        style: {
          border: 'none',
          margin: '0',
          backgroundColor: 'transparent',
          marginRight: '0.5rem'
        }
      },
      icon: {
        type: 'solid',
        name: `fa-thumbs-up`,
        className: 'fa-lg',
        style: {
          background: 'hsl(0, 0%, 96%)',
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
