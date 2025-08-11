import React from 'react'
import { createRoot } from 'react-dom/client'
import AppWrapper from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
)
