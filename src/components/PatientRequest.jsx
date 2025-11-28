import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import secureLocalStorage from 'react-secure-storage';
import PatientAppointmentRequestForm from './PatientAppointmentRequestForm';

const styles = {
    wrapper: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F6FAFF',
        backdropFilter: 'blur(4px)',
        borderRadius: '1.5rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        flex: 1,
        minHeight: 0,
        backgroundColor: '#F5F5FA',
        borderRadius: '1rem',
        padding: '1rem',
        position: 'relative',
    },
    sectionContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        overflowY: 'auto',
        maxHeight: 'calc(3 * (1rem + 4.5rem))', // 3 cards + gaps
    },
    sectionTitle: {
        fontSize: '1.25rem',
        fontWeight: 600,
        color: '#4169E1',
        marginBottom: '0.5rem',
        flexShrink: 0,
        paddingRight: '150px',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '1rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        transition: 'all 0.3s',
        cursor: 'pointer',
    },
    cardContent: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        flex: 1,
    },
    dateBadge: {
        background: 'linear-gradient(to bottom right, #60a5fa, #2563eb)',
        borderRadius: '9999px',
        padding: '0.75rem 1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        minWidth: '100px',
        justifyContent: 'center',
    },
    dateBadgePast: {
        background: 'linear-gradient(to bottom right, #9ca3af, #6b7280)',
        borderRadius: '9999px',
        padding: '0.75rem 1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        minWidth: '100px',
        justifyContent: 'center',
    },
    dateText: {
        color: 'white',
        fontWeight: 600,
        fontSize: '0.875rem',
        whiteSpace: 'nowrap',
    },
    infoText: {
        flex: 1,
        minWidth: 0,
    },
    names: {
        color: '#4169E1',
        fontWeight: 500,
        fontSize: '0.875rem',
    },
    namesPast: {
        color: '#6b7280',
        fontWeight: 500,
        fontSize: '0.875rem',
    },
    loading: {
        textAlign: 'center',
        color: '#6b7280',
        padding: '2rem',
    },
    error: {
        textAlign: 'center',
        color: '#ff5252',
        padding: '2rem',
    },
    requestButton: {
        backgroundColor: '#4169E1',
        color: 'white',
        border: 'none',
        borderRadius: '0.5rem',
        padding: '0.5rem 1rem',
        fontSize: '0.875rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.3s',
        boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.1)',
        position: 'absolute',
        top: '1rem',
        right: '1rem',
    },
    deleteButton: {
        backgroundColor: '#ff5252',
        color: 'white',
        border: 'none',
        borderRadius: '0.5rem',
        padding: '0.5rem 1rem',
        fontSize: '0.875rem',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'all 0.3s',
        boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.1)',
    },
    statusBadge: {
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: 600,
        whiteSpace: 'nowrap',
    },
    statusPending: {
        backgroundColor: '#fef3c7',
        color: '#92400e',
    },
    statusApproved: {
        backgroundColor: '#d1fae5',
        color: '#065f46',
    },
    statusCanceled: {
        backgroundColor: '#f3f4f6',
        color: '#4b5563',
    },
};

const PatientRequest = () => {
    const [currentRequests, setCurrentRequests] = useState([]);
    const [pastAppointments, setPastAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);

            // Get current logged in patient ID
            const currentPatientId = secureLocalStorage.getItem("id");

            if (!currentPatientId) {
                throw new Error('User not logged in');
            }

            // Fetch both APIs in parallel
            const [appointmentsRes, usersRes] = await Promise.all([
                fetch(import.meta.env.VITE_BACKEND + 'api/appointment-requests'),
                fetch(import.meta.env.VITE_BACKEND + 'api/users')
            ]);

            if (!appointmentsRes.ok || !usersRes.ok) {
                throw new Error('Failed to fetch data');
            }

            const appointments = await appointmentsRes.json();
            const users = await usersRes.json();

            // Filter appointments for current patient only
            const patientAppointments = appointments.filter(
                apt => apt.patientId === parseInt(currentPatientId)
            );

            // Create a map of doctorId to doctor's last name
            const doctorMap = {};
            users.forEach(user => {
                if (user.role === 'doctor') {
                    doctorMap[user.id] = user.lastName;
                }
            });

            // Map appointments with doctor names
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const mappedAppointments = patientAppointments.map(apt => {
                const doctorName = doctorMap[apt.doctorId] || 'Unknown Doctor';
                const aptDate = new Date(apt.preferredDate);

                return {
                    id: apt.id,
                    date: aptDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                    doctor: `Dr. ${doctorName}`,
                    reason: apt.reason,
                    rawDate: aptDate,
                    status: apt.status,
                    patientId: apt.patientId,
                    doctorId: apt.doctorId,
                    preferredDate: apt.preferredDate
                };
            });

            // Separate into current and past
            // Current: Only PENDING requests from present to future
            const current = mappedAppointments
                .filter(apt => apt.rawDate >= today && apt.status === 'PENDING')
                .sort((a, b) => b.id - a.id); // Sort by ID descending (newest first)
            // Past: Everything else (past dates or non-PENDING status)
            const past = mappedAppointments
                .filter(apt => apt.rawDate < today || apt.status !== 'PENDING')
                .sort((a, b) => b.id - a.id); // Sort by ID descending (newest first)

            setCurrentRequests(current);
            setPastAppointments(past);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCardHover = (e) => {
        e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
    };

    const handleCardLeave = (e) => {
        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    };

    const handleRequestClick = () => {
        setShowForm(true);
    };

    const handleFormClose = () => {
        setShowForm(false);
    };

    const handleFormSubmit = (formData) => {
    };

    const handleFormSuccess = () => {
        // Refetch data after successful submission
        fetchData();
    };

    const handleDeleteRequest = async (appointmentId) => {
        try {
            // Find the appointment to get its details
            const appointment = currentRequests.find(apt => apt.id === appointmentId);
            if (!appointment) return;

            // Send PUT request to update the status to 'cancelled'
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND}api/appointment-requests/${appointmentId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        patientId: appointment.patientId,
                        doctorId: appointment.doctorId,
                        preferredDate: appointment.preferredDate,
                        reason: appointment.reason,
                        status: 'CANCELED'
                    })
                }
            );

            if (!response.ok) {
                throw new Error('Failed to cancel appointment');
            }

            // Refetch data to update the UI
            fetchData();
        } catch (err) {
            console.error('Error cancelling appointment:', err);
            alert('Failed to cancel appointment. Please try again.');
        }
    };

    const handleButtonHover = (e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 6px 12px -2px rgba(0, 0, 0, 0.15)';
    };

    const handleButtonLeave = (e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        if (e.currentTarget.style.backgroundColor === 'rgb(65, 105, 225)') {
            e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            e.currentTarget.style.boxShadow = '0 2px 4px -1px rgba(0, 0, 0, 0.1)';
        }
    };

    if (loading) {
        return (
            <div style={styles.wrapper}>
                <div style={styles.loading}>Loading appointments...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={styles.wrapper}>
                <div style={styles.error}>Error: {error}</div>
            </div>
        );
    }

    return (
        <div style={styles.wrapper}>
            {showForm && (
                <PatientAppointmentRequestForm
                    onClose={handleFormClose}
                    onSubmit={handleFormSubmit}
                    onSuccess={handleFormSuccess}
                />
            )}

            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Current Requests</h2>
                <button
                    style={styles.requestButton}
                    onClick={handleRequestClick}
                    onMouseEnter={handleButtonHover}
                    onMouseLeave={handleButtonLeave}
                >
                    Request Appointment
                </button>
                <div style={styles.sectionContent}>
                    {currentRequests.length === 0 ? (
                        <div style={styles.loading}>No current requests</div>
                    ) : (
                        currentRequests.map((apt, index) => (
                            <div
                                key={index}
                                style={styles.card}
                                onMouseEnter={handleCardHover}
                                onMouseLeave={handleCardLeave}
                            >
                                <div style={styles.cardContent}>
                                    <div style={styles.dateBadge}>
                                        <Calendar style={{ width: '1rem', height: '1rem', color: 'white' }} />
                                        <span style={styles.dateText}>
                                            {apt.date}
                                        </span>
                                    </div>

                                    <div style={styles.infoText}>
                                        <span style={styles.names}>
                                            {apt.doctor} - {apt.reason}
                                        </span>
                                    </div>

                                    <div style={{
                                        ...styles.statusBadge,
                                        ...(apt.status === 'PENDING' ? styles.statusPending :
                                            apt.status === 'APPROVED' ? styles.statusApproved :
                                                apt.status === 'CANCELED' ? styles.statusCanceled :
                                                    styles.statusRejected)
                                    }}>
                                        {apt.status}
                                    </div>
                                </div>
                                <button
                                    style={styles.deleteButton}
                                    onClick={() => handleDeleteRequest(apt.id)}
                                    onMouseEnter={handleButtonHover}
                                    onMouseLeave={handleButtonLeave}
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Past Requests</h2>
                <div style={styles.sectionContent}>
                    {pastAppointments.length === 0 ? (
                        <div style={styles.loading}>No past requests</div>
                    ) : (
                        pastAppointments.map((apt, index) => (
                            <div
                                key={index}
                                style={styles.card}
                                onMouseEnter={handleCardHover}
                                onMouseLeave={handleCardLeave}
                            >
                                <div style={styles.cardContent}>
                                    <div style={styles.dateBadgePast}>
                                        <Calendar style={{ width: '1rem', height: '1rem', color: 'white' }} />
                                        <span style={styles.dateText}>
                                            {apt.date}
                                        </span>
                                    </div>

                                    <div style={styles.infoText}>
                                        <span style={styles.namesPast}>
                                            {apt.doctor} - {apt.reason}
                                        </span>
                                    </div>

                                    <div style={{
                                        ...styles.statusBadge,
                                        ...(apt.status === 'PENDING' ? styles.statusPending :
                                            apt.status === 'APPROVED' ? styles.statusApproved :
                                                apt.status === 'CANCELED' ? styles.statusCanceled :
                                                    styles.statusRejected)
                                    }}>
                                        {apt.status == 'CANCELED' ? (
                                            'REJECTED/CANCELED'
                                        ) : (
                                            `${apt.status}`
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatientRequest;