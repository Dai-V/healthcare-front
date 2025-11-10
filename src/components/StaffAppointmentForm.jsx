import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Search } from 'lucide-react';

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    modal: {
        backgroundColor: '#E6D5F5',
        borderRadius: '2rem',
        padding: '2.5rem',
        width: '90%',
        maxWidth: '400px',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
    },
    closeButton: {
        position: 'absolute',
        top: '1.5rem',
        right: '1.5rem',
        backgroundColor: 'transparent',
        border: 'none',
        color: '#4169E1',
        cursor: 'pointer',
        padding: '0.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: '1.75rem',
        fontWeight: 700,
        color: '#4169E1',
        marginBottom: '1.5rem',
        textAlign: 'center',
    },
    formGroup: {
        marginBottom: '1.5rem',
    },
    label: {
        display: 'block',
        fontSize: '1.125rem',
        fontWeight: 600,
        color: '#4169E1',
        marginBottom: '0.5rem',
    },
    input: {
        width: '100%',
        padding: '0.75rem 1rem',
        borderRadius: '1.5rem',
        border: 'none',
        backgroundColor: 'white',
        fontSize: '1rem',
        outline: 'none',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    },
    searchInputWrapper: {
        position: 'relative',
        width: '100%',
    },
    searchIcon: {
        position: 'absolute',
        left: '1rem',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#4169E1',
        pointerEvents: 'none',
    },
    searchInput: {
        width: '100%',
        padding: '0.75rem 1rem 0.75rem 2.75rem',
        borderRadius: '1.5rem',
        border: 'none',
        backgroundColor: 'white',
        fontSize: '1rem',
        outline: 'none',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    },
    patientList: {
        maxHeight: '200px',
        overflowY: 'auto',
        backgroundColor: 'white',
        borderRadius: '1rem',
        marginTop: '0.5rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    },
    patientItem: {
        padding: '0.75rem 1rem',
        cursor: 'pointer',
        borderBottom: '1px solid #E6D5F5',
        transition: 'background-color 0.2s',
    },
    patientItemHover: {
        backgroundColor: '#F3E8FF',
    },
    patientName: {
        fontWeight: 600,
        color: '#4169E1',
        fontSize: '1rem',
    },
    patientEmail: {
        fontSize: '0.875rem',
        color: '#6B7280',
        marginTop: '0.25rem',
    },
    textarea: {
        width: '100%',
        padding: '0.75rem 1rem',
        borderRadius: '1.5rem',
        border: 'none',
        backgroundColor: 'white',
        fontSize: '1rem',
        outline: 'none',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        minHeight: '100px',
        resize: 'vertical',
        fontFamily: 'inherit',
    },
    submitButton: {
        width: '100%',
        backgroundColor: 'white',
        color: '#4169E1',
        border: 'none',
        borderRadius: '1.5rem',
        padding: '0.875rem',
        fontSize: '1.125rem',
        fontWeight: 600,
        cursor: 'pointer',
        marginTop: '1rem',
        transition: 'all 0.3s',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    selectedPatient: {
        backgroundColor: 'white',
        padding: '0.75rem 1rem',
        borderRadius: '1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    clearButton: {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#4169E1',
        cursor: 'pointer',
        padding: '0.25rem',
        fontSize: '0.875rem',
        fontWeight: 600,
    },
    infoBox: {
        backgroundColor: 'white',
        padding: '0.75rem 1rem',
        borderRadius: '1.5rem',
        fontSize: '1rem',
        color: '#4169E1',
    },
    loading: {
        textAlign: 'center',
        padding: '1rem',
        color: '#4169E1',
    },
    error: {
        textAlign: 'center',
        padding: '1rem',
        color: '#DC2626',
        fontSize: '0.875rem',
    },
};

const StaffAppointmentForm = ({ onClose, onSuccess, doctorId, doctorName, date, timeSlot }) => {
    const [formData, setFormData] = useState({
        patientUserId: null,
        reason: '',
        duration: '60', // Default 60 minutes
    });

    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hoveredItem, setHoveredItem] = useState(null);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        fetchPatients();
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const fetchPatients = async () => {
        try {
            setLoading(true);
            setError(null);

            const usersResponse = await fetch(import.meta.env.VITE_BACKEND + 'api/users');

            if (!usersResponse.ok) {
                throw new Error('Failed to fetch data');
            }

            const users = await usersResponse.json();

            // Filter users with role "patient"
            const patientUsers = users.filter(user => user.role === 'patient');

            setPatients(patientUsers);
            setLoading(false);
        } catch (err) {
            setError('Failed to load patients. Please try again.');
            setLoading(false);
        }
    };

    const filteredPatients = patients.filter(patient => {
        const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
        const search = searchTerm.toLowerCase();
        return fullName.includes(search) || patient.email.toLowerCase().includes(search);
    });

    const handlePatientSelect = (patient) => {
        setSelectedPatient(patient);
        setFormData(prev => ({ ...prev, patientUserId: patient.id }));
        setSearchTerm('');
        setShowDropdown(false);
    };

    const handleClearPatient = () => {
        setSelectedPatient(null);
        setFormData(prev => ({ ...prev, patientUserId: null }));
        setSearchTerm('');
        setShowDropdown(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Convert timeSlot string to datetime
    const createDateTime = (dateStr, timeSlotStr) => {
        const d = new Date(dateStr);
        const match = timeSlotStr.match(/(\d+)\.00 (AM|PM)/);
        if (!match) return null;

        let hour = parseInt(match[1]);
        const period = match[2];

        if (period === 'PM' && hour !== 12) {
            hour += 12;
        } else if (period === 'AM' && hour === 12) {
            hour = 0;
        }

        d.setHours(hour, 0, 0, 0);
        return d;
    };

    const toLocalISOString = (date) => {
        const pad = (n) => String(n).padStart(2, '0');
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    };

    const handleSubmit = async () => {
        if (formData.patientUserId && formData.reason) {
            try {
                const startDateTime = createDateTime(date, timeSlot);
                if (!startDateTime) {
                    alert('Invalid time slot');
                    return;
                }

                // Calculate end time based on duration
                const endDateTime = new Date(startDateTime);
                endDateTime.setMinutes(endDateTime.getMinutes() + parseInt(formData.duration));

                const response = await fetch(import.meta.env.VITE_BACKEND + 'api/appointments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        patientUserId: formData.patientUserId,
                        doctorUserId: doctorId,
                        scheduledStart: toLocalISOString(startDateTime),
                        scheduledEnd: toLocalISOString(endDateTime),
                        reason: formData.reason,
                        status: 'Scheduled'
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to create appointment');
                }

                const result = await response.json();

                if (onSuccess) {
                    onSuccess();
                }

                onClose();
            } catch (err) {
                alert('Failed to create appointment. Please try again.');
                console.error('Error creating appointment:', err);
            }
        } else {
            alert('Please fill in all required fields');
        }
    };

    const handleButtonHover = (e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
    };

    const handleButtonLeave = (e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return createPortal(
        <div style={styles.overlay} onClick={handleOverlayClick}>
            <div style={styles.modal}>
                <button style={styles.closeButton} onClick={onClose}>
                    <X size={28} strokeWidth={3} />
                </button>

                <h2 style={styles.title}>Create Appointment</h2>

                <div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Doctor:</label>
                        <div style={styles.infoBox}>{doctorName}</div>
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Date & Time:</label>
                        <div style={styles.infoBox}>
                            {new Date(date).toLocaleDateString()} at {timeSlot}
                        </div>
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Duration (minutes):</label>
                        <input
                            type="number"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            min="15"
                            step="15"
                            style={styles.input}
                            required
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Patient:</label>
                        {selectedPatient ? (
                            <div style={styles.selectedPatient}>
                                <div>
                                    <div style={styles.patientName}>
                                        {selectedPatient.firstName} {selectedPatient.lastName}
                                    </div>
                                    <div style={styles.patientEmail}>
                                        {selectedPatient.email}
                                    </div>
                                </div>
                                <button style={styles.clearButton} onClick={handleClearPatient}>
                                    Change
                                </button>
                            </div>
                        ) : (
                            <>
                                <div style={styles.searchInputWrapper}>
                                    <Search size={20} style={styles.searchIcon} />
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            setShowDropdown(true);
                                        }}
                                        onFocus={() => setShowDropdown(true)}
                                        style={styles.searchInput}
                                        placeholder="Search by name or email..."
                                        required
                                    />
                                </div>
                                {showDropdown && (
                                    <div style={styles.patientList}>
                                        {loading && <div style={styles.loading}>Loading patients...</div>}
                                        {error && <div style={styles.error}>{error}</div>}
                                        {!loading && !error && filteredPatients.length === 0 && (
                                            <div style={styles.loading}>No patients found</div>
                                        )}
                                        {!loading && !error && filteredPatients.map(patient => (
                                            <div
                                                key={patient.id}
                                                style={{
                                                    ...styles.patientItem,
                                                    ...(hoveredItem === patient.id ? styles.patientItemHover : {})
                                                }}
                                                onClick={() => handlePatientSelect(patient)}
                                                onMouseEnter={() => setHoveredItem(patient.id)}
                                                onMouseLeave={() => setHoveredItem(null)}
                                            >
                                                <div style={styles.patientName}>
                                                    {patient.firstName} {patient.lastName}
                                                </div>
                                                <div style={styles.patientEmail}>
                                                    {patient.email}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Note:</label>
                        <textarea
                            name="reason"
                            value={formData.reason}
                            onChange={handleChange}
                            style={styles.textarea}
                            placeholder="Note for the appointment..."
                            required
                        />
                    </div>

                    <button
                        type="button"
                        style={styles.submitButton}
                        onClick={handleSubmit}
                        onMouseEnter={handleButtonHover}
                        onMouseLeave={handleButtonLeave}
                    >
                        Create Appointment
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default StaffAppointmentForm;