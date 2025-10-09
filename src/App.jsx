import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage';
import Dashboard from './pages/Dashboard.jsx';

function App() {

  return (
    <>
      <Routes>
        <Route path="*" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </>
  )
}

export default App