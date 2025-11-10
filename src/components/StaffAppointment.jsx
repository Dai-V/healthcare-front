import { Clock, User } from 'lucide-react';
import { useEffect, useState } from 'react';


function StaffAppointment({ selectedDate }) {
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState({});
    const [hoveredKey, setHoveredKey] = useState(null);
    const [loading, setLoading] = useState(true);

    const dateToUse = selectedDate || new Date();

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
        //padding: '1rem 2rem 1rem 2rem',
        padding: isMobile ? '1rem' : '1rem 2rem',
        width: '100%',
        boxShadow: `
            0 6px 12px rgba(0, 0, 0, 0.3),
            0 12px 28px rgba(0, 0, 0, 0.25)
        `,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        //overflow: 'auto'
        overflowX: isMobile ? 'auto' : 'hidden',
        overflowY: 'auto',
    },
    headerRow: {
        display: 'flex',
        //gap: '1rem',
        //position: 'sticky',
        flexDirection: isMobile ? 'row' : 'row',
        flexWrap: isMobile ? 'wrap' : 'nowrap',
        gap: isMobile ? '0.5rem' : '1rem',
        position: isMobile ? 'relative' : 'sticky',
        top: 0,
        backgroundColor: '#F6FAFF',
        zIndex: 10,
        paddingBottom: '1rem'
    },
    timeHeader: {
        minWidth: '140px',
        width: '140px',
        fontWeight: '600',
        color: '#5c6bc0',
        fontSize: '1.1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    doctorHeader: {
        flex: 1,
        minWidth: isMobile ? '100%' : '200px',
        //minWidth: '200px',
        backgroundColor: '#5c6bc0',
        color: 'white',
        padding: '1rem',
        //borderRadius: '1.5rem',
        borderRadius: isMobile ? '1rem' : '1.5rem',
        fontWeight: '600',
        fontSize: '1.1rem',
        textAlign: 'center',
        boxShadow: '0 2px 8px rgba(92, 107, 192, 0.3)'
    },
    appointmentRow: {
        display: 'flex',
        gap: '1rem',
        marginBottom: '1rem',
        //alignItems: 'stretch',
        alignItems: isMobile ? 'stretch' : 'center',
        flexDirection: isMobile ? 'row' : 'row',
        flexWrap: isMobile ? 'wrap' : 'nowrap',
    },
    timeSlot: {
        backgroundColor: 'white',
        padding: '0.75rem 1rem',
        borderRadius: '1.5rem',
        display: 'flex',
        //alignItems: 'center',
        justifyContent: 'center',
        //gap: '0.5rem',
        boxShadow: `
            0 6px 14px rgba(0, 0, 0, 0.22),
            0 12px 28px rgba(0, 0, 0, 0.18)
        `,
        minWidth: '140px',
        width: '140px',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'stretch' : 'center',
        gap: isMobile ? '0.5rem' : '1rem',
    },
    timeText: {
        color: '#5c6bc0',
        fontWeight: '500',
        fontSize: '1rem'
    },
    appointmentCell: {
        flex: 1,
        minWidth: '200px',
        minHeight: '60px'
    },
    patientTag: {
        height: '100%',
        backgroundColor: 'white',
        color: '#5c6bc0',
        padding: '0.75rem 1rem',
        borderRadius: '1.5rem',
        fontWeight: '600',
        fontSize: '1rem',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        cursor: 'pointer',
        border: 'none',
        transition: 'all 0.2s ease',
        width: '100%'
    },
    patientTagHover: {
        backgroundColor: '#5c6bc0',
        color: 'white',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(92, 107, 192, 0.3)'
    },
    emptyCell: {
        height: '100%',
        backgroundColor: '#f0f0f5',
        borderRadius: '1.5rem',
        minHeight: '60px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        border: '2px dashed transparent'
    },
    emptyCellHover: {
        backgroundColor: '#e0e0eb',
        border: '2px dashed #5c6bc0',
        transform: 'translateY(-2px)',
        boxShadow: '0 2px 8px rgba(92, 107, 192, 0.2)'
    },
    iconWrapper: {
        color: '#9fa8da',
        display: 'flex',
        alignItems: 'center'
    },
    loadingText: {
        textAlign: 'center',
        color: '#5c6bc0',
        fontSize: '1.2rem',
        padding: '2rem',
    },

    doctorCard: {
        backgroundColor: '#F6FAFF',
        borderRadius: '1.5rem',
        padding: '1rem',
        marginBottom: '1rem',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },

    doctorTitle: {
        color: '#5c6bc0',
        fontWeight: '700',
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '1.2rem',
        marginBottom: '0.75rem',
        textAlign: 'center',
    },

    mobileSlotRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: '1rem',
        padding: '0.75rem 1rem',
        marginBottom: '0.5rem',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },

    timeLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: '#5c6bc0',
        fontWeight: '500',
    },

    patientLabel: {
        color: '#5c6bc0',
        fontWeight: '600',
    textAlign: 'right',
    },
};

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

    // Function to find appointment for a specific doctor and time slot
    const getAppointmentForDoctorAndSlot = (doctorId, timeSlot) => {
        const slotHour = getSlotHour(timeSlot);

        return appointments.find(apt => {
            const appointmentDate = new Date(apt.scheduledStart);
            const isCorrectDate = isSameDay(appointmentDate, dateToUse);
            const aptHour = appointmentDate.getHours();
            const isCorrectHour = aptHour === slotHour;
            const isCorrectDoctor = apt.doctorUserId === doctorId;

            return isCorrectDate && isCorrectHour && isCorrectDoctor;
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

    // Get patient's name
    const getPatientName = (patientUserId) => {
        const patient = patients[patientUserId];
        if (patient) {
            return `${patient.firstName} ${patient.lastName}`;
        }
        return `Patient #${patientUserId}`;
    };

    const handleAppointmentClick = (appointment, doctorName) => {
        const startTime = formatTime(appointment.scheduledStart);
        const endTime = formatTime(appointment.scheduledEnd);
        const patientName = getPatientName(appointment.patientUserId);
     

        alert(
            `Appointment Details:\n` +
            `Doctor: ${doctorName}\n` +
            `Patient: ${patientName}\n` +
            `Time: ${startTime} - ${endTime}\n` +
            `Reason: ${appointment.reason}\n` +
            `Status: ${appointment.status}`
        );
    };

    const handleEmptySlotClick = (doctor, timeSlot) => {
        const doctorName = `Dr. ${doctor.lastName}`;

        alert(
            `Create New Appointment\n\n` +
            `Doctor: ${doctorName}\n` +
            `Date: ${dateToUse.toLocaleDateString()}\n` +
            `Time: ${timeSlot}\n\n` +
            `(This would open a form to create a new appointment)`
        );
    };

    // Fetch all data
    useEffect(() => {
        async function fetchAllData() {
            setLoading(true);
            try {
                // Fetch all doctors
                const doctorsResponse = await fetch(
                    import.meta.env.VITE_BACKEND + 'api/doctors',
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (!doctorsResponse.ok) {
                    throw new Error(`HTTP error! status: ${doctorsResponse.status}`);
                }

                const doctorsData = await doctorsResponse.json();

                // Fetch all users
                const usersResponse = await fetch(
                    import.meta.env.VITE_BACKEND + 'api/users',
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (!usersResponse.ok) {
                    throw new Error(`HTTP error! status: ${usersResponse.status}`);
                }

                const usersData = await usersResponse.json();

                // Create a map of users by ID for quick lookup
                const usersMap = {};
                usersData.forEach(user => {
                    usersMap[user.id] = user;
                });

                // Match doctors with their user info
                const doctorsWithUserInfo = doctorsData.map(doctor => {
                    const userInfo = usersMap[doctor.id];
                    if (userInfo) {
                        return { ...doctor, ...userInfo };
                    }
                    return doctor;
                });

                setDoctors(doctorsWithUserInfo);

                // Fetch all appointments
                const appointmentsResponse = await fetch(
                    import.meta.env.VITE_BACKEND + 'api/appointments',
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (!appointmentsResponse.ok) {
                    throw new Error(`HTTP error! status: ${appointmentsResponse.status}`);
                }

                const appointmentsData = await appointmentsResponse.json();
                setAppointments(appointmentsData);

                // Get unique patient IDs and match with users from usersMap
                const uniquePatientIds = [...new Set(appointmentsData.map(apt => apt.patientUserId))];
                const patientsMap = {};
                uniquePatientIds.forEach(patientId => {
                    if (usersMap[patientId]) {
                        patientsMap[patientId] = usersMap[patientId];
                    }
                });

                setPatients(patientsMap);
                console.log('Data loaded:', { doctors: doctorsWithUserInfo, appointments: appointmentsData, patients: patientsMap });
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchAllData();
    }, [selectedDate]);

    if (loading) {
        return (
            <div style={styles.card}>
                <div style={styles.loadingText}>Loading appointments...</div>
            </div>
        );
    }

    return (
        <div style={styles.card}>
            {isMobile ? (
                // MOBILE LAYOUT BELOW
                doctors.map((doctor) => (
                <div key={doctor.id} style={styles.doctorCard}>
                    <h3 style={styles.doctorTitle}>Dr. {doctor.lastName}</h3>
                        {timeSlots.map((time) => {
                            const appointment = getAppointmentForDoctorAndSlot(doctor.id, time);
                            const patientName = appointment ? getPatientName(appointment.patientUserId) : null;
                        return (
                            <div key={time} style={styles.mobileSlotRow}>
                                <div style={styles.timeLabel}>
                                    <Clock size={16} /> <span>{time}</span>
                                </div>
                                <div style={styles.patientLabel}>
                                    {patientName ? patientName : '—'}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ))
        ) : (
        <>
            <div style={styles.headerRow}>
                <div style={styles.timeHeader}>Time</div>
                {doctors.map((doctor) => (
                    <div key={doctor.id} style={styles.doctorHeader}>
                        Dr. {doctor.lastName}
                    </div>
                ))}
            </div>

            {timeSlots.map((time, timeIndex) => (
                <div key={timeIndex} style={styles.appointmentRow}>
                    {/* Time Column */}
                    <div style={styles.timeSlot}>
                        <div style={styles.iconWrapper}>
                            <Clock size={18} />
                        </div>
                        <span style={styles.timeText}>{time}</span>
                    </div>

                    {/* Doctor Columns */}
                    {doctors.map((doctor) => {
                        const appointment = getAppointmentForDoctorAndSlot(doctor.id, time);
                        const hoverKey = `${timeIndex}-${doctor.id}`;
                        const emptyHoverKey = `empty-${timeIndex}-${doctor.id}`;
                        const doctorName = `Dr. ${doctor.lastName}`;

                        return (
                            <div key={doctor.id} style={styles.appointmentCell}>
                                {appointment ? (
                                    <button
                                        style={{
                                            ...styles.patientTag,
                                            ...(hoveredKey === hoverKey ? styles.patientTagHover : {})
                                        }}
                                        onMouseEnter={() => setHoveredKey(hoverKey)}
                                        onMouseLeave={() => setHoveredKey(null)}
                                        onClick={() => handleAppointmentClick(appointment, doctorName)}
                                    >
                                        <div style={styles.iconWrapper}>
                                            <User size={18} />
                                        </div>
                                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {getPatientName(appointment.patientUserId)}
                                        </span>
                                    </button>
                                ) : (
                                    <div
                                        style={{
                                            ...styles.emptyCell,
                                            ...(hoveredKey === emptyHoverKey ? styles.emptyCellHover : {})
                                        }}
                                        onMouseEnter={() => setHoveredKey(emptyHoverKey)}
                                        onMouseLeave={() => setHoveredKey(null)}
                                        onClick={() => handleEmptySlotClick(doctor, time)}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            ))}
            </>
        )}
        </div>
    );
}
export default StaffAppointment;