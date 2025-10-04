import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import LoginPage from './pages/LoginPage'
import NavBar from './components/NavBar'
import SignUpPage from './pages/SignUpPage';

function App() {

  return (
    <>
      <Routes>
        <Route path="*" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage/>} />
      </Routes>
    </>
  )
}

export default App