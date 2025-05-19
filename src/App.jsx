import { useState } from 'react'
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Contact from './pages/Contact'
import About from './pages/About'
import Dashboard from './modules/dashboard/Dashboard'
import Blogs from './pages/Blogs'
import RegisterEnquiry from './pages/RegisterEnquiry'

function App() {
  const [count, setCount] = useState(0)

  return (
    <><div className="container-fluid px-4 bg-neutral-gradient-1 fullscreen text-white d-flex align-items-center justify-content-center position-relative bg-overlay">
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/login/*' element={<Login/>}></Route>
      <Route path='/blogs' element={<Blogs/>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/contact' element={<Contact/>}></Route>
      <Route path='/dashboard/*' element={<Dashboard/>}></Route>
      <Route path='/loanenquiryhome' element={<RegisterEnquiry/>}></Route>
    </Routes>
    </BrowserRouter>
    </div>
    </>
  )
}

export default App
