import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from './components'
import * as serviceWorker from './worker'
import 'react-virtualized/styles.css'

ReactDOM.render(<Router />, document.getElementById('app-root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
