import React, { useState, useEffect } from 'react';
import { Edit } from 'lucide-react';
import secureLocalStorage from 'react-secure-storage';

const styles = {
    container: {
        width: '100%',
        overflow: 'auto',
        backgroundColor: '#F6FAFF',
        padding: '1rem',
        borderRadius: '24px',

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
        gridTemplateColumns: 'repeat(2, 1fr)',
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



};

const StaffProfile = () => {
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUserInfo() {
            const userId = secureLocalStorage.getItem('id');
            try {
                // Fetch user info
                const userResponse = await fetch(
                    import.meta.env.VITE_BACKEND + 'api/users/' + userId,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (!userResponse.ok) {
                    throw new Error(`HTTP error! status: ${userResponse.status}`);
                }

                const userData = await userResponse.json();
                setLoading(false);


                setUserInfo({
                    firstName: userData.firstName || '',
                    lastName: userData.lastName || '',
                    email: userData.email || '',
                    role: userData.role.toLowerCase() || '',
                });
                console.log('User info loaded:', { userData });
            } catch (error) {
                console.error('Error fetching user info:', error);
                setLoading(false);
            }
        }

        fetchUserInfo();
    }, []);

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
                                <span style={styles.infoLabel}>Last Name:</span>
                                <span style={styles.infoValue}>{userInfo.lastName}</span>
                            </div>
                            <div style={styles.infoItem}>
                                <span style={styles.infoLabel}>Email:</span>
                                <span style={styles.infoValue}>{userInfo.email}</span>
                            </div>

                            <div style={styles.infoItem}>
                                <span style={styles.infoLabel}>Role:</span>
                                <span style={styles.infoValue}>{userInfo.role || 'Not provided'}</span>
                            </div>
                        </div>
                    </div>


                </>
            )}
        </div>
    );
};

export default StaffProfile;