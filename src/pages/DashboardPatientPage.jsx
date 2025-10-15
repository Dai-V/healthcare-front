import Calendar from '../components/Calendar'
import HelloLogo from '../components/HelloLogo';
import { useState, useEffect } from 'react';
import secureLocalStorage from 'react-secure-storage';
import NavMenu from '../components/NavMenu';
import LoginLogo from '../components/LoginLogo';
import PatientAppointment from '../components/PatientAppointment.jsx';


function DashboardPatientPage() {
    const [id, setId] = useState(secureLocalStorage.getItem("id"));
    const [role, setRole] = useState(secureLocalStorage.getItem("role"));
    useEffect(() => {
    }, []);


    const body = {
        overflow: 'hidden',
        position: 'relative',
        top: 0,
        left: 0,
        minWidth: '100vw',
        minHeight: '100vh',
        width: '100vw',
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundImage: 'linear-gradient(to left, #F8EDE5 30.4%, #82ABF8 88.48%)',
        display: 'grid',
        gridTemplateColumns: '400px 1fr',
        gridTemplateRows: 'auto 1fr',
        padding: '1vw'

    }

    const styles = {

        // Grid Area: Row 1, Column 1
        welcomeLogo: {
            gridColumn: '1 / 2',
            gridRow: '1 / 2',
            marginTop: '30px',
            padding: '0 40px 0px',
        },
        // Grid Area: Row 1-2, Column 2 (spans full height of right side)
        mainContentWrapper: {
            gridColumn: '2 / 3',
            gridRow: '2 / 3',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
        },
        // Grid Area: Row 2, Column 1
        sidebar: {
            gridColumn: '1 / 2',
            gridRow: '2 / 3',
            padding: '0 30px 30px 30px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
        },
        // Inside MainContentWrapper
        okHealthLogo: {
            gridColumn: '2/3',
            gridRow: '1/2',
            justifySelf: 'end',
            fontSize: '24px',
            fontWeight: '800',
            color: '#5b7fb8',
            width: '200px',
            height: '100px'
        },
        // Placeholder styles for components
        calendar: {
            borderRadius: '24px',
            padding: '20px',
            minHeight: '280px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#5b7fb8',
            fontWeight: '600',
        },
        navMenu: {
            borderRadius: '24px',
            padding: '20px',
            minHeight: '220px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#5b7fb8',
            fontWeight: '600',
        },
        mainContent: {

            borderRadius: '24px',
            padding: '20px',
            flex: 1,
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'stretch',
            color: '#5b7fb8',
        },
    };

    return (
        <div style={body}>
            {/* WelcomeLogo - Top Left */}
            <div style={styles.welcomeLogo}>
                <HelloLogo />
            </div>

            {/* Sidebar - Bottom Left (contains Calendar and NavMenu) */}
            <div style={styles.sidebar}>
                {/* Calendar Component */}
                <div style={styles.calendar}>
                    <Calendar />
                </div>

                {/* NavMenu Component */}
                <div style={styles.navMenu}>
                    <NavMenu role={role} />
                </div>
            </div>
            <div style={styles.okHealthLogo}>
                <LoginLogo />
            </div>
            {/* MainContent Area - Entire Right Side */}
            <div style={styles.mainContentWrapper}>


                {/* MainContent Component */}
                <div style={styles.mainContent}>
                    <PatientAppointment />
                </div>
            </div>
        </div>
    );
};



export default DashboardPatientPage