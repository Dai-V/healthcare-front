import React from 'react';
import { Clock, User } from 'lucide-react';

const appointments = [
    { time: '9:00AM', doctor: 'Dr. Mort', occupied: true },
    { time: '10:00AM', doctor: null, occupied: false },
    { time: '11:00AM', doctor: 'Dr. Ouch', occupied: true },
    { time: '12:00PM', doctor: null, occupied: false },
    { time: '1:00PM', doctor: null, occupied: false },
    { time: '2:00PM', doctor: null, occupied: false },
    { time: '3:00PM', doctor: 'Dr. Not-OK', occupied: true }
];

const styles = {

    card: {
        backgroundColor: '#F6FAFFB2',
        borderRadius: '2rem',
        padding: '2rem',
        width: '100%',
        midWidth: '100px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
    },

    appointmentRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 0',
        borderBottom: '1px solid #c5cae9',
        gap: '1rem'
    },
    leftSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    },
    timeSlot: {
        backgroundColor: 'white',
        padding: '0.75rem 1.5rem',
        borderRadius: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        minWidth: '140px'
    },
    timeText: {
        color: '#5c6bc0',
        fontWeight: '500',
        fontSize: '1rem'
    },
    doctorTag: {
        backgroundColor: 'white',
        color: '#5c6bc0',
        padding: '0.75rem 1.5rem',
        borderRadius: '1.5rem',
        fontWeight: '600',
        fontSize: '1.125rem',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    },
    iconWrapper: {
        color: '#9fa8da',
        display: 'flex',
        alignItems: 'center'
    }
};

function PatientAppointment() {
    return (
        <div style={styles.card}>
            {appointments.map((apt, index) => (
                <div key={index} style={styles.appointmentRow}>
                    <div style={styles.leftSection}>
                        <div style={styles.timeSlot}>
                            <div style={styles.iconWrapper}>
                                <Clock size={18} />
                            </div>
                            <span style={styles.timeText}>{apt.time}</span>
                        </div>
                    </div>

                    {apt.occupied && (
                        <div style={styles.doctorTag}>
                            <div style={styles.iconWrapper}>
                                <User size={18} />
                            </div>
                            {apt.doctor}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default PatientAppointment