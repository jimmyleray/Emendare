/**
 * Return props for the div and icon depending on the result of the vote or the user vote
 * @param amend Current Amend
 */
export const getPropsAmendUp = (
  isUp: boolean
): {
  container: { className: string; style: any }
  icon: {
    type: 'solid' | 'regular' | 'light' | 'brands'
    name: string
    className: string
    style: any
  }
} => ({
  container: {
    className: `${
      isUp ? 'has-text-link' : 'has-text-grey-light'
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
      background: isUp ? 'hsl(217, 71%, 53%, 20%)' : 'none',
      borderRadius: '50%',
      height: '2.3rem',
      width: '2.3rem',
      marginLeft: 'calc(-.375em - 1px)',
      marginRight: '.1875em'
    }
  }
})

/**
 * Return props for the div and icon depending on the result of the vote or the user vote
 * @param amend Current Amend
 */
export const getPropsAmendDown = (
  isDown: boolean
): {
  container: { className: string; style: any }
  icon: {
    type: 'solid' | 'regular' | 'light' | 'brands'
    name: string
    className: string
    style: any
  }
} => ({
  container: {
    className: `${
      isDown ? 'has-text-danger' : 'has-text-grey-light'
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
      background: isDown ? 'hsl(348, 100%, 61%, 20%)' : 'none',
      borderRadius: '50%',
      height: '2.3rem',
      width: '2.3rem',
      marginLeft: 'calc(-.375em - 1px)',
      marginRight: '.1875em'
    }
  }
})
