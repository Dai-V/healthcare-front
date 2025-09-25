import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import LoginPage from './pages/LoginPage'
import NavBar from './components/NavBar'

function App() {

  return (
    <>
    <p> Main</p>
    <NavBar/>
      <Routes>
        <Route path="*" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App