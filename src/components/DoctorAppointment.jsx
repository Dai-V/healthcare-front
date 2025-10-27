import { Clock, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import secureLocalStorage from 'react-secure-storage';

const timeSlots = [
    '9.00 AM',
    '10.00 AM',
    '11.00 AM',
    '12.00 PM',
    '1.00 PM',
    '2.00 PM',
    '3.00 PM'
];

const styles = {
    card: {
        backgroundColor: '#F6FAFF',
        borderRadius: '2rem',
        padding: '2rem',
        width: '100%',
        midWidth: '100px',
        boxShadow: `
            0 6px 12px rgba(0, 0, 0, 0.3),
            0 12px 28px rgba(0, 0, 0, 0.25)
        `,
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    appointmentRow: {
        display: 'flex',
        alignItems: 'center',
        padding: '1rem 0',
        borderBottom: '1px solid #c5cae9',
        gap: '1rem',
        flex: 1
    },
    leftSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    },
    timeSlot: {
        backgroundColor: 'white',
        padding: '0.75rem 1.5rem',
        borderRadius: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        boxShadow: `
            0 6px 14px rgba(0, 0, 0, 0.22),
            0 12px 28px rgba(0, 0, 0, 0.18)
        `,
        minWidth: '140px',
        flex: 1,
    },
    timeText: {
        color: '#5c6bc0',
        fontWeight: '500',
        fontSize: '1rem'
    },
    patientTag: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        backgroundColor: 'white',
        color: '#5c6bc0',
        padding: '0.75rem 1.5rem',
        borderRadius: '1.5rem',
        fontWeight: '600',
        fontSize: '1.125rem',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        cursor: 'pointer',
        border: 'none',
    },
    patientTagHover: {
        backgroundColor: '#5c6bc0',
        color: 'white',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(92, 107, 192, 0.3)'
    },
    iconWrapper: {
        color: '#9fa8da',
        display: 'flex',
        alignItems: 'center'
    }
};

function DoctorAppointment({ selectedDate }) {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [patients, setPatients] = useState({});

    const dateToUse = selectedDate || new Date();

    // Function to check if two dates are the same day
    const isSameDay = (date1, date2) => {
        const d1 = new Date(date1);
        const d2 = new Date(date2);

        return d1.getDate() === d2.getDate() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getFullYear() === d2.getFullYear();
    };

    // Function to convert time slot string to hour (24-hour format)
    const getSlotHour = (timeSlot) => {
        const match = timeSlot.match(/(\d+)\.00 (AM|PM)/);
        if (!match) return null;

        let hour = parseInt(match[1]);
        const period = match[2];

        if (period === 'PM' && hour !== 12) {
            hour += 12;
        } else if (period === 'AM' && hour === 12) {
            hour = 0;
        }

        return hour;
    };

    // Function to find appointment for a specific time slot on the selected date
    const getAppointmentForSlot = (timeSlot) => {
        const slotHour = getSlotHour(timeSlot);

        return appointments.find(apt => {
            const appointmentDate = new Date(apt.scheduledStart);
            const isCorrectDate = isSameDay(appointmentDate, dateToUse);
            const aptHour = appointmentDate.getHours();
            const isCorrectHour = aptHour === slotHour;

            return isCorrectDate && isCorrectHour;
        });
    };

    // Format time for display
    const formatTime = (dateString) => {
        const date = new Date(dateString);
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const minutesStr = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}:${minutesStr} ${ampm}`;
    };

    // Get patient's full name
    const getPatientName = (patientUserId) => {
        const patient = patients[patientUserId];
        if (patient) {
            return `${patient.firstName} ${patient.lastName}`;
        }
        return `Patient #${patientUserId}`;
    };

    const handlePatientClick = (appointment) => {
        const startTime = formatTime(appointment.scheduledStart);
        const endTime = formatTime(appointment.scheduledEnd);
        const patientName = getPatientName(appointment.patientUserId);

        alert(
            `Appointment Details:\n` +
            `Patient: ${patientName}\n` +
            `Time: ${startTime} - ${endTime}\n` +
            `Reason: ${appointment.reason}\n` +
            `Status: ${appointment.status}`
        );
    };

    // Fetch patient information
    const fetchPatientInfo = async (patientUserId) => {
        try {
            const response = await fetch(
                import.meta.env.VITE_BACKEND + 'api/users/' + patientUserId,
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

            const patientData = await response.json();
            return patientData;
        } catch (error) {
            console.error(`Error fetching patient ${patientUserId}:`, error);
            return null;
        }
    };

    // Fetch appointments
    useEffect(() => {
        async function getAppointments() {
            try {
                const response = await fetch(
                    import.meta.env.VITE_BACKEND + 'api/appointments',
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
                const doctorId = secureLocalStorage.getItem('id');
                const apps = data.filter(apt => apt.doctorUserId == doctorId);

                setAppointments(apps);

                // Fetch patient info for all unique patients in appointments
                const uniquePatientIds = [...new Set(apps.map(apt => apt.patientUserId))];
                const patientPromises = uniquePatientIds.map(id => fetchPatientInfo(id));
                const patientsData = await Promise.all(patientPromises);

                // Create a dictionary of patients by ID
                const patientsMap = {};
                patientsData.forEach(patient => {
                    if (patient) {
                        patientsMap[patient.id] = patient;
                    }
                });

                setPatients(patientsMap);
                console.log('Patients loaded:', patientsMap);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        }
        getAppointments();
    }, [selectedDate]);

    return (
        <div style={styles.card}>
            {timeSlots.map((time, index) => {
                const appointment = getAppointmentForSlot(time);

                return (
                    <div key={index} style={styles.appointmentRow}>
                        <div style={styles.leftSection}>
                            <div style={styles.timeSlot}>
                                <div style={styles.iconWrapper}>
                                    <Clock size={18} />
                                </div>
                                <span style={styles.timeText}>{time}</span>
                            </div>
                        </div>

                        {appointment && (
                            <button
                                style={{
                                    ...styles.patientTag,
                                    ...(hoveredIndex === index ? styles.patientTagHover : {})
                                }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onClick={() => handlePatientClick(appointment)}
                            >
                                <div style={styles.iconWrapper}>
                                    <User size={18} />
                                </div>
                                <span>{getPatientName(appointment.patientUserId)} - {appointment.reason}</span>
                            </button>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default DoctorAppointment;