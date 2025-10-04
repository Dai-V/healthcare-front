import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage';
import DashboardDoctorPage from './pages/DashboardDoctorPage';

function App() {

  return (
    <>
      <Routes>
        <Route path="*" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardDoctorPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage/>} />
      </Routes>
    </>
  )
}

export default App