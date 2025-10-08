import Calendar from '../components/Calendar'
import HelloLogo from '../components/HelloLogo';
import { useState, useEffect } from 'react';
import secureLocalStorage from 'react-secure-storage';

function DashboardPatientPage() {
    const [id, setId] = useState(secureLocalStorage.getItem("id"));
    const [role, setRole] = useState(secureLocalStorage.getItem("role"));
    useEffect(() => {
    }, []);


    const body = {
        overflow: 'hidden', //prevent page break from extreme zooms
        position: 'relative',
        display: 'flex',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        minWidth: '100%',
        minHeight: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundImage: 'linear-gradient(to right, #F8EDE5 30.4%, #82ABF8 88.48%)',

    }

    return (
        <div style={body}>
            <Calendar />
            <HelloLogo />
        </div>
    )
}
export default DashboardPatientPage