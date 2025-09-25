import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import LoginPage from './pages/LoginPage'
import NavBar from './components/NavBar'
import LandingPage from './pages/LandingPage';

function App() {

  return (
    <>
    <NavBar/>
      <Routes>
        <Route path="*" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App