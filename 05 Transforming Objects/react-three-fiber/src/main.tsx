import React from 'react'
import ReactDOM from 'react-dom/client'

import BasicScene from './BasicScene'

import './styles.sass'

ReactDOM.createRoot(
  document.getElementById('canvas-container') as HTMLElement
).render(
  <React.StrictMode>
    <BasicScene />
  </React.StrictMode>
)
