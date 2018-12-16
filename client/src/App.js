import React from 'react'
import { Home, Explore, Group, Login, Profile, Text } from './pages'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Providers } from './components'

const App = () => (
  <Providers>
    <Router>
      <>
        <Route path="/" exact component={Home} />
        <Route path="/explore/" component={Explore} />
        <Route path="/group/" component={Group} />
        <Route path="/login/" component={Login} />
        <Route path="/profile/" component={Profile} />
        <Route path="/text/" component={Text} />
      </>
    </Router>
  </Providers>
)

export default App
