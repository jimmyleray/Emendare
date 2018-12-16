import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './components'
import * as serviceWorker from './utils/worker'

ReactDOM.render(<App />, document.getElementById('app-root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
