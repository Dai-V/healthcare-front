import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard.jsx';
import DashboardDoctorPage from './pages/DashboardDoctorPage.jsx';
import DashboardPatientPage from './pages/DashboardPatientPage.jsx';
import DashboardStaffPage from './pages/DashboardStaffPage.jsx';
import LoginPage from './pages/LoginPage';
import ResetPassword from './pages/ResetPassword.jsx';
import SignUpPage from './pages/SignUpPage';
import SymptomChecker from './pages/SymptomChecker.jsx';

function App() {

  return (
    <>
      <Routes>
        <Route path="*" element={<Dashboard />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/patient" element={<DashboardPatientPage />} />
        <Route path="/dashboard/doctor" element={<DashboardDoctorPage />} />
        <Route path="/dashboard/staff" element={<DashboardStaffPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/symptom-checker" element={<SymptomChecker />} />
      </Routes>
    </>
  )
}

export default App