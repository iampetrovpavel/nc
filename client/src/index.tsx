import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './css/reset.css'
import './css/bulma.css'
import './css/custom.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>
)
