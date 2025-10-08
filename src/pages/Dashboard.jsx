import secureLocalStorage from 'react-secure-storage';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import DashboardDoctorPage from './DashboardDoctorPage';
import DashboardPatientPage from './DashboardPatientPage';
import DashboardStaffPage from './DashboardStaffPage';
import { useState, useEffect } from 'react';



function Dashboard() {
    const [id, setId] = useState(secureLocalStorage.getItem("id"));
    const [role, setRole] = useState(secureLocalStorage.getItem("role"));
    const navigate = useNavigate();
    useEffect(() => {
        if (!id || !role) {
            navigate('/login')
        }
    }, []);
    if (role.toLowerCase() == 'patient')
        return (
            <DashboardPatientPage />
        )
    if (role.toLowerCase() == 'doctor')
        return (
            <DashboardDoctorPage />
        )
    if (role.toLowerCase() == 'staff')
        return (
            <DashboardStaffPage />
        )


}
export default Dashboard