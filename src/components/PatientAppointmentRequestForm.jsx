import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Search } from 'lucide-react';
import secureLocalStorage from 'react-secure-storage';


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
    doctorList: {
        maxHeight: '200px',
        overflowY: 'auto',
        backgroundColor: 'white',
        borderRadius: '1rem',
        marginTop: '0.5rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    },
    doctorItem: {
        padding: '0.75rem 1rem',
        cursor: 'pointer',
        borderBottom: '1px solid #E6D5F5',
        transition: 'background-color 0.2s',
    },
    doctorItemHover: {
        backgroundColor: '#F3E8FF',
    },
    doctorName: {
        fontWeight: 600,
        color: '#4169E1',
        fontSize: '1rem',
    },
    doctorSpecialty: {
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
    selectedDoctor: {
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

const PatientAppointmentRequestForm = ({ onClose, onSubmit, onSuccess }) => {
    const [formData, setFormData] = useState({
        doctorId: null,
        date: '',
        note: '',
    });

    const [doctors, setDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hoveredItem, setHoveredItem] = useState(null);

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        fetchDoctors();
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const fetchDoctors = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch users and doctors
            const [usersResponse, doctorsResponse] = await Promise.all([
                fetch(import.meta.env.VITE_BACKEND + 'api/users'),
                fetch(import.meta.env.VITE_BACKEND + 'api/doctors')
            ]);

            if (!usersResponse.ok || !doctorsResponse.ok) {
                throw new Error('Failed to fetch data');
            }

            const users = await usersResponse.json();
            const doctorsData = await doctorsResponse.json();

            // Filter users with role "doctor" and join with doctors data
            const doctorUsers = users.filter(user => user.role === 'doctor');
            const combinedDoctors = doctorUsers.map(user => {
                const doctorInfo = doctorsData.find(doc => doc.id === user.id);
                return {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    specialty: doctorInfo?.specialty || 'General Practice'
                };
            });

            setDoctors(combinedDoctors);
            setLoading(false);
        } catch (err) {
            setError('Failed to load doctors. Please try again.');
            setLoading(false);
        }
    };

    const filteredDoctors = doctors.filter(doctor => {
        const fullName = `${doctor.firstName} ${doctor.lastName}`.toLowerCase();
        const search = searchTerm.toLowerCase();
        return fullName.includes(search) || doctor.specialty.toLowerCase().includes(search);
    });

    const handleDoctorSelect = (doctor) => {
        setSelectedDoctor(doctor);
        setFormData(prev => ({ ...prev, doctorId: doctor.id }));
        setSearchTerm('');
        setShowDropdown(false);
    };

    const handleClearDoctor = () => {
        setShowDropdown(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const handleSubmit = async () => {
        if (formData.doctorId && formData.date && formData.note) {
            try {
                // Get patient ID from secure local storage
                const patientId = secureLocalStorage.getItem("id");

                if (!patientId) {
                    alert('User not logged in');
                    return;
                }

                // Send POST request to create appointment request
                const response = await fetch(import.meta.env.VITE_BACKEND + 'api/appointment-requests', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        patientId: patientId,
                        doctorId: formData.doctorId,
                        preferredDate: formData.date,
                        reason: formData.note
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to create appointment request');
                }

                const result = await response.json();

                // Call onSubmit callback with result data
                if (onSubmit) {
                    onSubmit({
                        ...result,
                        doctorName: `${selectedDoctor.firstName} ${selectedDoctor.lastName}`,
                        specialty: selectedDoctor.specialty,
                    });
                }

                // Call onSuccess to refresh the parent component
                if (onSuccess) {
                    onSuccess();
                }

                onClose();
            } catch (err) {
                alert('Failed to submit appointment request. Please try again.');
                console.error('Error submitting appointment:', err);
            }
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

                <h2 style={styles.title}>Submission Form</h2>

                <div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Doctor:</label>
                        {selectedDoctor ? (
                            <div style={styles.selectedDoctor}>
                                <div>
                                    <div style={styles.doctorName}>
                                        Dr. {selectedDoctor.firstName} {selectedDoctor.lastName}
                                    </div>
                                    <div style={styles.doctorSpecialty}>
                                        {selectedDoctor.specialty}
                                    </div>
                                </div>
                                <button style={styles.clearButton} onClick={handleClearDoctor}>
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
                                        placeholder="Search by name or specialty..."
                                        required
                                    />
                                </div>
                                {showDropdown && (
                                    <div style={styles.doctorList}>
                                        {loading && <div style={styles.loading}>Loading doctors...</div>}
                                        {error && <div style={styles.error}>{error}</div>}
                                        {!loading && !error && filteredDoctors.length === 0 && (
                                            <div style={styles.loading}>No doctors found</div>
                                        )}
                                        {!loading && !error && filteredDoctors.map(doctor => (
                                            <div
                                                key={doctor.id}
                                                style={{
                                                    ...styles.doctorItem,
                                                    ...(hoveredItem === doctor.id ? styles.doctorItemHover : {})
                                                }}
                                                onClick={() => handleDoctorSelect(doctor)}
                                                onMouseEnter={() => setHoveredItem(doctor.id)}
                                                onMouseLeave={() => setHoveredItem(null)}
                                            >
                                                <div style={styles.doctorName}>
                                                    Dr. {doctor.firstName} {doctor.lastName}
                                                </div>
                                                <div style={styles.doctorSpecialty}>
                                                    {doctor.specialty}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Date:</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            min={today}
                            style={styles.input}
                            required
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Note/Reason:</label>
                        <textarea
                            name="note"
                            value={formData.note}
                            onChange={handleChange}
                            style={styles.textarea}
                            placeholder="Please describe the reason for your appointment..."
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
                        Submit
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default PatientAppointmentRequestForm;