import React, { useState, useEffect } from 'react';
import { Calendar, Check, X } from 'lucide-react';

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
        maxHeight: 'calc(6 * (1rem + 4.5rem))', // 3 cards + gaps
    },
    sectionTitle: {
        fontSize: '1.25rem',
        fontWeight: 600,
        color: '#4169E1',
        marginBottom: '0.5rem',
        flexShrink: 0,
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
    patientName: {
        color: '#4169E1',
        fontWeight: 600,
        fontSize: '0.95rem',
        marginBottom: '0.25rem',
    },
    doctorAndReason: {
        color: '#6B7280',
        fontWeight: 500,
        fontSize: '0.875rem',
    },
    buttonGroup: {
        display: 'flex',
        gap: '0.5rem',
    },
    approveButton: {
        backgroundColor: '#10b981',
        color: 'white',
        border: 'none',
        borderRadius: '0.5rem',
        padding: '0.5rem',
        cursor: 'pointer',
        transition: 'all 0.3s',
        boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    denyButton: {
        backgroundColor: '#ef4444',
        color: 'white',
        border: 'none',
        borderRadius: '0.5rem',
        padding: '0.5rem',
        cursor: 'pointer',
        transition: 'all 0.3s',
        boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loading: {
        textAlign: 'center',
        color: '#6b7280',
        padding: '2rem',
    },
    error: {
        textAlign: 'center',
        color: '#ef4444',
        padding: '2rem',
    },
};

const StaffRequest = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);

            // Fetch all APIs in parallel
            const [appointmentsRes, usersRes] = await Promise.all([
                fetch(import.meta.env.VITE_BACKEND + 'api/appointment-requests'),
                fetch(import.meta.env.VITE_BACKEND + 'api/users')
            ]);

            if (!appointmentsRes.ok || !usersRes.ok) {
                throw new Error('Failed to fetch data');
            }

            const appointments = await appointmentsRes.json();
            const users = await usersRes.json();

            // Create maps for patients and doctors
            const userMap = {};
            users.forEach(user => {
                userMap[user.id] = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role
                };
            });

            // Map appointments with patient and doctor names
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const mappedAppointments = appointments
                .filter(apt => {
                    const aptDate = new Date(apt.preferredDate);
                    // Only show current/future requests that are PENDING
                    return aptDate >= today && apt.status === 'PENDING';
                })
                .map(apt => {
                    const patient = userMap[apt.patientId];
                    const doctor = userMap[apt.doctorId];
                    const aptDate = new Date(apt.preferredDate);

                    return {
                        id: apt.id,
                        date: aptDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                        patientName: patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient',
                        doctorName: doctor ? `Dr. ${doctor.lastName}` : 'Unknown Doctor',
                        reason: apt.reason,
                        rawDate: aptDate,
                        patientId: apt.patientId,
                        doctorId: apt.doctorId,
                        preferredDate: apt.preferredDate,
                        status: apt.status
                    };
                })
                .sort((a, b) => b.id - a.id); // Sort by ID descending (newest first)

            setRequests(mappedAppointments);
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

    const handleApprove = async (requestId) => {
        try {
            // Find the request to get its details
            const request = requests.find(req => req.id === requestId);
            if (!request) return;

            // Send PUT request to update the status to 'APPROVED'
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND}api/appointment-requests/${requestId}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        patientId: request.patientId,
                        doctorId: request.doctorId,
                        preferredDate: request.preferredDate,
                        reason: request.reason,
                        status: 'APPROVED'
                    })
                }
            );

            if (!response.ok) {
                throw new Error('Failed to approve appointment');
            }

            // Refetch data to update the UI
            fetchData();
        } catch (err) {
            console.error('Error approving appointment:', err);
            alert('Failed to approve appointment. Please try again.');
        }
    };

    const handleDeny = async (requestId) => {
        try {
            // Find the request to get its details
            const request = requests.find(req => req.id === requestId);
            if (!request) return;

            // Send PUT request to update the status to 'REJECTED'
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND}api/appointment-requests/${requestId}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        patientId: request.patientId,
                        doctorId: request.doctorId,
                        preferredDate: request.preferredDate,
                        reason: request.reason,
                        status: 'CANCELED'
                    })
                }
            );

            if (!response.ok) {
                throw new Error('Failed to reject appointment');
            }

            // Refetch data to update the UI
            fetchData();
        } catch (err) {
            console.error('Error rejecting appointment:', err);
            alert('Failed to reject appointment. Please try again.');
        }
    };

    const handleButtonHover = (e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 6px 12px -2px rgba(0, 0, 0, 0.15)';
    };

    const handleButtonLeave = (e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 4px -1px rgba(0, 0, 0, 0.1)';
    };

    if (loading) {
        return (
            <div style={styles.wrapper}>
                <div style={styles.loading}>Loading appointment requests...</div>
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
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Appointment Requests</h2>
                <div style={styles.sectionContent}>
                    {requests.length === 0 ? (
                        <div style={styles.loading}>No pending requests</div>
                    ) : (
                        requests.map((request) => (
                            <div
                                key={request.id}
                                style={styles.card}
                                onMouseEnter={handleCardHover}
                                onMouseLeave={handleCardLeave}
                            >
                                <div style={styles.cardContent}>
                                    <div style={styles.dateBadge}>
                                        <Calendar style={{ width: '1rem', height: '1rem', color: 'white' }} />
                                        <span style={styles.dateText}>
                                            {request.date}
                                        </span>
                                    </div>

                                    <div style={styles.infoText}>
                                        <div style={styles.patientName}>
                                            {request.patientName}
                                        </div>
                                        <div style={styles.doctorAndReason}>
                                            {request.doctorName} - {request.reason}
                                        </div>
                                    </div>
                                </div>
                                <div style={styles.buttonGroup}>
                                    <button
                                        style={styles.approveButton}
                                        onClick={() => handleApprove(request.id)}
                                        onMouseEnter={handleButtonHover}
                                        onMouseLeave={handleButtonLeave}
                                        title="Approve"
                                    >
                                        <Check size={20} />
                                    </button>
                                    <button
                                        style={styles.denyButton}
                                        onClick={() => handleDeny(request.id)}
                                        onMouseEnter={handleButtonHover}
                                        onMouseLeave={handleButtonLeave}
                                        title="Deny"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default StaffRequest;