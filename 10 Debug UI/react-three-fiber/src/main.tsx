import React from 'react'
import ReactDOM from 'react-dom/client'

import Scene from './Scene'

import './styles.sass'

ReactDOM.createRoot(
  document.getElementById('canvas-container') as HTMLElement
).render(
  <React.StrictMode>
    <Scene />
  </React.StrictMode>
)
