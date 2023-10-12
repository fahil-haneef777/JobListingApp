import { useState } from 'react'
import Login from './Pages/Login/Login'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Login/>
    </>
  )
}

export default App
