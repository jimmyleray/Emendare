import React from 'react'
import { Page } from '../components'
import { UserContext } from '../contexts'

export const Home = () => (
  <Page pageName="Accueil">
    <UserContext.Consumer>
      {({ amount, incrementAmount }) => (
        <div>
          <button onClick={incrementAmount}>Increment</button>
          <p>Home page of {amount}</p>
        </div>
      )}
    </UserContext.Consumer>
  </Page>
)
