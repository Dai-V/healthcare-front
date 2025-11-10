import { useEffect, useState } from 'react';
import secureLocalStorage from 'react-secure-storage';
import Calendar from '../components/Calendar';
import HelloLogo from '../components/HelloLogo';
import LoginLogo from '../components/LoginLogo';
import NavMenu from '../components/NavMenu';
import StaffAppointment from '../components/StaffAppointment.jsx';
import StaffProfile from '../components/StaffProfile.jsx';
import StaffRequest from '../components/StaffRequest.jsx';
// import AppointmentRequests from '../components/AppointmentRequests.jsx'; // Create this component

function DashboardStaffPage() {
    const [id, setId] = useState(secureLocalStorage.getItem("id"));
    const [role, setRole] = useState(secureLocalStorage.getItem("role"));
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [activeView, setActiveView] = useState('Appointments'); // Add this state


    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile(); // run once on mount
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
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
        //gridTemplateColumns: '380px minmax(0, 1fr)',
        //gridTemplateRows: 'auto 1fr',
        //padding: '1vw',
        gridTemplateColumns: isMobile ? '1fr' : '380px minmax(0, 1fr)',
        gridTemplateRows: isMobile ? 'auto auto auto' : 'auto 1fr',
        padding: isMobile ? '20px' : '1vw',
        overflowY: 'auto',
        overflowX: 'hidden',
        alignItems: 'stretch',
        justifyItems: 'stretch',
        gap: isMobile ? '0.2rem' : '0.5px',
    }

    const styles = {
        welcomeLogo: {
            //gridColumn: '1 / 2',
            //gridRow: '1 / 2',
            //marginTop: '30px',
            //padding: '0 40px 0px',
            gridColumn: isMobile ? '1 / 2' : '1 / 2',
            gridRow: isMobile ? '1 / 2' : '1 / 2',
            marginTop: isMobile ? '0px' : '1.8rem',
            padding: isMobile ? '0' : '0 40px 0px',
            textAlign: isMobile ? 'center' : 'left',
        },
        mainContentWrapper: {
            //gridColumn: '2 / 3',
            //gridRow: '2 / 3',
            gridColumn: isMobile ? '1 / 2' : '2 / 3',
            gridRow: isMobile ? '3 / 4' : '2 / 3',
            display: 'flex',
            flexDirection: 'column',
            //height: '100%',
            justifyContent: 'center',
            height: isMobile ? 'auto' : '100%',
            order: isMobile ? 3 : 'unset',
            marginTop: isMobile ? '3rem' : '0px',
        },
        sidebar: {
            //gridColumn: '1 / 2',
            //gridRow: '2 / 3',
            //padding: '0 30px 30px 30px',
            gridColumn: isMobile ? '1 / 2' : '1 / 2',
            gridRow: isMobile ? '2 / 3' : '2 / 3',
            padding: isMobile ? '0' : '0 30px 30px 30px',
            display: 'flex',
            flexDirection: 'column',
            //justifyContent: 'space-between',
            justifyContent: isMobile ? 'space-between' : 'space-between',
            gap: isMobile ? '1rem' : '1rem',
            flex: '100%',
            //height: '100%',
            height: isMobile ? 'auto' : '100%',
        },
        okHealthLogo: {
            //gridColumn: '2/3',
            gridColumn: isMobile ? '1 / 2' : '2 / 3',
            gridRow: '1/2',
            justifySelf: 'end',
            fontSize: '24px',
            fontWeight: '800',
            color: '#5b7fb8',
            width: '200px',
            height: '100px',
            //marginTop: '-20px'
            marginTop: isMobile ? '-2.6rem' : '-2rem',
            marginRight: isMobile ? '-0.5rem' : '1.5rem',
            transition: 'margin-top 0.3s ease-in-out',
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
            //overflowX: 'auto',
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
                return <StaffAppointment selectedDate={selectedDate} />;
            case 'Profile':
                return <StaffProfile />;
            case 'Requests':
                return <StaffRequest />
            default:
                return <StaffAppointment selectedDate={selectedDate} />;
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

export default DashboardStaffPage