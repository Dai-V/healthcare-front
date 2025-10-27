import Calendar from '../components/Calendar'
import DoctorAppointment from '../components/DoctorAppointment';
import HelloLogo from '../components/HelloLogo';
import NavMenu from '../components/NavMenu';
import { useEffect, useState } from 'react';
import secureLocalStorage from 'react-secure-storage';
import LoginLogo from '../components/LoginLogo';
import DoctorProfile from '../components/DoctorProfile';



function DashboardDoctorPage() {
    const [id, setId] = useState(secureLocalStorage.getItem("id"));
    const [role, setRole] = useState(secureLocalStorage.getItem("role"));
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [activeView, setActiveView] = useState('Appointments'); // Add this state
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
        gridTemplateColumns: '380px minmax(0, 1fr)',
        gridTemplateRows: 'auto 1fr',
        padding: '1vw',
        overflowY: 'auto',
        overflowX: 'hidden',
        alignItems: 'stretch',
        justifyItems: 'stretch'
    }

    const styles = {
        welcomeLogo: {
            gridColumn: '1 / 2',
            gridRow: '1 / 2',
            marginTop: '30px',
            padding: '0 40px 0px',
        },
        mainContentWrapper: {
            gridColumn: '2 / 3',
            gridRow: '2 / 3',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'center',
        },
        sidebar: {
            gridColumn: '1 / 2',
            gridRow: '2 / 3',
            padding: '0 30px 30px 30px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: '100%',
            height: '100%',
        },
        okHealthLogo: {
            gridColumn: '2/3',
            gridRow: '1/2',
            justifySelf: 'end',
            fontSize: '24px',
            fontWeight: '800',
            color: '#5b7fb8',
            width: '200px',
            height: '100px',
            marginTop: '-20px'
        },
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
            paddingBottom: '0px',
            flex: 1,
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'stretch',
        },
    };

    // Handle date selection and switch to Appointments view
    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setActiveView('Appointments');
    };

    // Render content based on active view
    const renderMainContent = () => {
        switch (activeView) {
            case 'Appointments':
                return <DoctorAppointment selectedDate={selectedDate} />;
            case 'Profile':
                return <DoctorProfile />;
            default:
                return <DoctorAppointment selectedDate={selectedDate} />;
        }
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
                    <Calendar onDateSelect={handleDateSelect} />
                </div>

                {/* NavMenu Component */}
                <div style={styles.navMenu}>
                    <NavMenu
                        role={role}
                        activeView={activeView}
                        onViewChange={setActiveView}
                    />
                </div>
            </div>

            <div style={styles.okHealthLogo}>
                <LoginLogo />
            </div>

            {/* MainContent Area - Entire Right Side */}
            <div style={styles.mainContentWrapper}>
                {/* MainContent Component */}
                <div style={styles.mainContent}>
                    {renderMainContent()}
                </div>
            </div>
        </div>
    );
};

export default DashboardDoctorPage;