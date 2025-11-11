import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import secureLocalStorage from "react-secure-storage";


const styles = {
    container: {
        position: 'absolute',
        padding: '20px',
        background: '#F6FAFF',
        borderRadius: '24px',
        fontFamily: '"Montserrat", sans-serif',
        width: '20em',
        boxShadow: `
            0 6px 12px rgba(0, 0, 0, 0.3),
            0 12px 28px rgba(0, 0, 0, 0.25)
        `,
    },
    menuItem: {
        position: 'relative',
        width: '100%',
        padding: '14px 20px',
        marginBottom: '12px',
        background: 'white',
        border: 'none',
        borderRadius: '16px',
        fontSize: '15px',
        fontWeight: '500',
        color: '#5b7fb8',
        cursor: 'pointer',
        textAlign: 'center',
        boxShadow: `
            0 6px 12px rgba(0, 0, 0, 0.3),
            0 12px 28px rgba(0, 0, 0, 0.25)
        `,
        transition: 'all 0.2s ease',
    },
    activeItem: {
        background: '#82ABF8',
        color: 'white',
        boxShadow: `
            inset 3px 3px 6px rgba(0, 0, 0, 0.25),
            inset -3px -3px 6px rgba(255, 255, 255, 0.6)
        `,
        transition: 'all 0.2s ease',
    },
    logoutButton: {
        position: 'relative',
        width: '100%',
        padding: '14px 20px',
        background: '#ff6b6b',
        border: 'none',
        borderRadius: '16px',
        fontSize: '15px',
        fontWeight: '500',
        color: 'white',
        cursor: 'pointer',
        textAlign: 'center',
        boxShadow: `
            0 6px 12px rgba(0, 0, 0, 0.3),
            0 12px 28px rgba(0, 0, 0, 0.25)
        `,
        transition: 'all 0.2s ease',
    },
    badge: {
        position: 'absolute',
        top: '-6px',
        right: '-6px',
        width: '22px',
        height: '22px',
        background: '#ff6b6b',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '12px',
        fontWeight: '600',
        boxShadow: `
            0 6px 12px rgba(0, 0, 0, 0.3),
            0 12px 28px rgba(0, 0, 0, 0.25)
        `,
    },
};

const NavMenu = ({ role, activeView, onViewChange }) => {
    const navigate = useNavigate();
    const handleMenuClick = (view) => {
        if (onViewChange) {
            onViewChange(view);
        }
    };

    const handleLogout = () => {
        secureLocalStorage.setItem("id", null)
        secureLocalStorage.setItem("role", null)
        navigate('/login')
    };

    if (role == 'doctor')
        return (
            <div style={styles.container}>
                <div style={{ position: 'relative' }}>
                    <button
                        style={{
                            ...styles.menuItem,
                            ...(activeView === 'Appointments' ? styles.activeItem : {}),
                        }}
                        onClick={() => handleMenuClick('Appointments')}
                    >
                        Appointments
                    </button>
                </div>

                <button
                    style={{
                        ...styles.menuItem,
                        ...(activeView === 'Profile' ? styles.activeItem : {}),
                    }}
                    onClick={() => handleMenuClick('Profile')}
                >
                    Profile
                </button>

                <button
                    style={styles.logoutButton}
                    onClick={handleLogout}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#ff5252';
                        e.currentTarget.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#ff6b6b';
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                >
                    Logout
                </button>
            </div>
        );
    else
        return (
            <div style={styles.container}>
                <div style={{ position: 'relative' }}>
                    <button
                        style={{
                            ...styles.menuItem,
                            ...(activeView === 'Appointments' ? styles.activeItem : {}),
                        }}
                        onClick={() => handleMenuClick('Appointments')}
                    >
                        Appointments
                    </button>
                </div>
                <div style={{ position: 'relative' }}>
                    <button
                        style={{
                            ...styles.menuItem,
                            ...(activeView === 'Requests' ? styles.activeItem : {}),
                        }}
                        onClick={() => handleMenuClick('Requests')}
                    >
                        Requests
                    </button>
                    {/* <div style={styles.badge}>0</div> */}
                </div>

                <button
                    style={{
                        ...styles.menuItem,
                        ...(activeView === 'Profile' ? styles.activeItem : {}),
                    }}
                    onClick={() => handleMenuClick('Profile')}
                >
                    Profile
                </button>

                <button
                    style={styles.logoutButton}
                    onClick={handleLogout}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#ff5252';
                        e.currentTarget.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#ff6b6b';
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                >
                    Logout
                </button>
            </div>
        );
};

export default NavMenu;