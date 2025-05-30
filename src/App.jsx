import { useState } from 'react'
import Home from './layouts/Home'
import SidebarProvider from './contexts/SidebarContext'
import Sidebar from './components/Sidebar'

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <>
    <SidebarProvider>
     <Home/>
     <Sidebar/>
    </SidebarProvider>
    </>
  )
}

export default App
