import React, { useState } from 'react';
import { X } from 'lucide-react';

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
};

const PatientAppointmentRequestForm = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        doctor: '',
        date: '',
        time: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
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

    return (
        <div style={styles.overlay} onClick={handleOverlayClick}>
            <div style={styles.modal}>
                <button style={styles.closeButton} onClick={onClose}>
                    <X size={28} strokeWidth={3} />
                </button>

                <h2 style={styles.title}>Submission Form</h2>

                <form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Doctor:</label>
                        <input
                            type="text"
                            name="doctor"
                            value={formData.doctor}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Date:</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Time:</label>
                        <input
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        style={styles.submitButton}
                        onMouseEnter={handleButtonHover}
                        onMouseLeave={handleButtonLeave}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PatientAppointmentRequestForm;