import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import LoginPage from './pages/LoginPage'
import TasksPage from './pages/TasksPage'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TasksPage />
    </>
  )
}

export default App
