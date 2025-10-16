import React, { useState, useEffect } from 'react';
import { Edit } from 'lucide-react';
import secureLocalStorage from 'react-secure-storage';

const styles = {
    container: {
        width: '100%',
        height: '100%',
        overflow: 'auto',
    },
    headerSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        backgroundColor: '#E8E8F5',
        borderRadius: '2rem',
        padding: '1.5rem 2rem',
        marginBottom: '1rem',
    },
    avatar: {
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: '#4169E1',
        border: '4px solid #FFD700',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2rem',
    },
    username: {
        fontSize: '2.5rem',
        fontWeight: '700',
        color: '#4169E1',
        margin: 0,
    },
    myInfoHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '1.25rem',
        fontWeight: '600',
        color: '#4169E1',
        marginBottom: '1rem',
    },
    editIcon: {
        cursor: 'pointer',
    },
    infoCard: {
        backgroundColor: '#F5F5FA',
        borderRadius: '1.5rem',
        padding: '2rem',
        marginBottom: '1.5rem',
    },
    infoGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.5rem',
    },
    infoItem: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    infoLabel: {
        fontSize: '1rem',
        fontWeight: '600',
        color: '#4169E1',
    },
    infoValue: {
        fontSize: '0.95rem',
        color: '#666',
    },
    historyHeader: {
        fontSize: '1.25rem',
        fontWeight: '600',
        color: '#4169E1',
        marginBottom: '1rem',
    },
    historyCard: {
        backgroundColor: '#F5F5FA',
        borderRadius: '1.5rem',
        padding: '1.5rem',
    },
    appointmentRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 1.5rem',
        marginBottom: '0.5rem',
        borderRadius: '1.5rem',
        transition: 'all 0.2s ease',
    },
    appointmentRowPurple: {
        backgroundColor: '#E8E8F5',
    },
    appointmentRowWhite: {
        backgroundColor: 'white',
    },
    appointmentDate: {
        fontSize: '1rem',
        fontWeight: '500',
        color: '#4169E1',
    },
    appointmentDoctor: {
        fontSize: '1rem',
        fontWeight: '500',
        color: '#4169E1',
    },

};

const UserProfile = () => {
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dob: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUserInfo() {
            try {
                const userId = secureLocalStorage.getItem('id');
                const response = await fetch(
                    import.meta.env.VITE_BACKEND + 'api/users/' + userId,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                setUserInfo({
                    firstName: data.firstName || '',
                    lastName: data.lastName || '',
                    email: data.email || '',
                    phone: '',
                    dob: '',
                    role: data.role || '',
                });

                setLoading(false);
                console.log('User info loaded:', data);
            } catch (error) {
                console.error('Error fetching user info:', error);
                setLoading(false);
            }
        }

        fetchUserInfo();
    }, []);

    const appointments = [
        { date: '10.14', time: '10:30 AM', doctor: 'Dr. House' },
        { date: '10.15', time: '11:00 AM', doctor: 'Dr. Home' },
    ];

    return (
        <div style={styles.container}>
            {loading ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#4169E1' }}>
                    Loading...
                </div>
            ) : (
                <>
                    {/* Header Section */}
                    <div style={styles.headerSection}>
                        <h1 style={styles.username}>User Profile</h1>
                    </div>

                    {/* My Info Section */}


                    <div style={styles.infoCard}>
                        <div style={styles.myInfoHeader}>
                            My Info <Edit size={20} style={styles.editIcon} />
                        </div>
                        <div style={styles.infoGrid}>
                            <div style={styles.infoItem}>
                                <span style={styles.infoLabel}>First Name:</span>
                                <span style={styles.infoValue}>{userInfo.firstName}</span>
                            </div>
                            <div style={styles.infoItem}>
                                <span style={styles.infoLabel}>Email:</span>
                                <span style={styles.infoValue}>{userInfo.email}</span>
                            </div>

                            <div style={styles.infoItem}>
                                <span style={styles.infoLabel}>Last Name:</span>
                                <span style={styles.infoValue}>{userInfo.lastName}</span>
                            </div>
                            <div style={styles.infoItem}>
                                <span style={styles.infoLabel}>Phone Number:</span>
                                <span style={styles.infoValue}>{userInfo.phone || 'Not provided'}</span>
                            </div>
                            <div style={styles.infoItem}>
                                <span style={styles.infoLabel}>DOB:</span>
                                <span style={styles.infoValue}>{userInfo.dob || 'Not provided'}</span>
                            </div>
                            <div style={styles.infoItem}>
                                <span style={styles.infoLabel}>Role:</span>
                                <span style={styles.infoValue}>{userInfo.role || 'Not provided'}</span>
                            </div>
                        </div>
                    </div>

                    {/* History of Appointments */}
                    {/* <div style={styles.historyHeader}>History of Appointments</div> */}

                    <div style={styles.historyCard}>
                        <div style={styles.historyHeader}>History of Appointments</div>
                        {appointments.map((apt, index) => (
                            <div
                                key={index}
                                style={{
                                    ...styles.appointmentRow,
                                    ...(index % 2 === 0 ? styles.appointmentRowPurple : styles.appointmentRowWhite),
                                }}
                            >
                                <span style={styles.appointmentDate}>
                                    {apt.date} | {apt.time}
                                </span>
                                <span style={styles.appointmentDoctor}>{apt.doctor}</span>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default UserProfile;