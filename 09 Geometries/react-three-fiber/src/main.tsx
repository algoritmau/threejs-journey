import React from 'react'
import ReactDOM from 'react-dom/client'

import Geometry from './Geometry'

import './styles.sass'

ReactDOM.createRoot(
  document.getElementById('canvas-container') as HTMLElement
).render(
  <React.StrictMode>
    <Geometry />
  </React.StrictMode>
)
