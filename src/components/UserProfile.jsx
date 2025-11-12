import { Check, Edit, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import secureLocalStorage from 'react-secure-storage';
import pfp from '../assets/pfp.png';

function formatDateForInput(value) {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate()
  ).padStart(2, '0')}`;
}

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    role: ''
  });
  const [original, setOriginal] = useState(null);
  const [editInfo, setEditInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = {
  container: {
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: '#F6FAFF',
    padding: '1rem',
    borderRadius: '24px',
    flexDirection: isMobile ? 'column' : 'row',
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
  username: {
    fontSize: '2.5rem',
    fontFamily: "Montserrat, sans-serif",
    fontWeight: '700',
    color: '#4169E1',
    margin: 0,
  },
  myInfoHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontFamily: "Montserrat, sans-serif",
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#4169E1',
    marginBottom: '1rem',
    justifyContent: 'space-between'
  },
  headerActions: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center'
  },
  editIcon: { cursor: 'pointer' },
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
  infoItem: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  infoLabel: { fontSize: '1rem', fontFamily: "Montserrat, sans-serif", fontWeight: '600', color: '#4169E1' },
  infoValue: { fontSize: '0.95rem', color: '#666' },
  input: {
    padding: '0.6rem 0.8rem',
    borderRadius: '0.75rem',
    border: '1px solid #d7d7ee',
    background: 'white',
    fontFamily: "Montserrat, sans-serif",
    fontSize: '0.95rem',
    color: '#333',
    outline: 'none',
  },
  inputDisabled: {
    padding: '0.6rem 0.8rem',
    borderRadius: '0.75rem',
    border: '1px solid #d7d7ee',
    background: '#E8E8E8',
    fontSize: '0.95rem',
    color: '#777',
    outline: 'none',
    cursor: 'not-allowed',
  },
  saveBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    background: '#4169E1',
    color: 'white',
    border: 'none',
    padding: '0.5rem 0.9rem',
    borderRadius: '0.75rem',
    cursor: 'pointer'
  },
  cancelBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    background: 'white',
    color: '#4169E1',
    border: '1px solid #4169E1',
    padding: '0.5rem 0.9rem',
    borderRadius: '0.75rem',
    cursor: 'pointer'
  },
  historyHeader: {
    fontFamily: "Montserrat, sans-serif",
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
  appointmentRowPurple: { backgroundColor: '#E8E8F5' },
  appointmentRowWhite: { backgroundColor: 'white' },
  appointmentDate: { fontFamily: "Montserrat, sans-serif", fontSize: '1rem', fontWeight: '500', color: '#4169E1' },
  appointmentDoctor: { fontFamily: "Montserrat, sans-serif", fontSize: '1rem', fontWeight: '500', color: '#4169E1' },
};

  useEffect(() => {
    async function fetchUserInfo() {
      const userId = secureLocalStorage.getItem('id');
      try {
        const userRes = await fetch(import.meta.env.VITE_BACKEND + 'api/users/' + userId);
        const userData = await userRes.json();
        const patientRes = await fetch(import.meta.env.VITE_BACKEND + 'api/patients/' + userId);
        const patientData = await patientRes.json();

        const combined = {
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          email: userData.email || '',
          phone: patientData.phoneNumber || '',
          dob: patientData.dateOfBirth || '',
          role: (userData.role || '').toLowerCase()
        };
        setUserInfo(combined);
        setOriginal(combined);

        const aRes = await fetch(import.meta.env.VITE_BACKEND + 'api/appointments');
        const aData = await aRes.json();

        const now = new Date();
        const uidStr = String(userId);
        const pastAppointments = aData.filter(
          (apt) => String(apt.patientUserId) === uidStr && new Date(apt.scheduledStart) < now
        );

        const withDoctors = await Promise.all(
          pastAppointments.map(async (apt) => {
            try {
              const dRes = await fetch(
                import.meta.env.VITE_BACKEND + 'api/users/' + apt.doctorUserId
              );
              if (dRes.ok) {
                const d = await dRes.json();
                return { ...apt, doctorName: `Dr. ${d.firstName} ${d.lastName}` };
              }
              return { ...apt, doctorName: 'Unknown Doctor' };
            } catch {
              return { ...apt, doctorName: 'Unknown Doctor' };
            }
          })
        );

        withDoctors.sort((a, b) => new Date(b.scheduledStart) - new Date(a.scheduledStart));
        setAppointments(withDoctors);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchUserInfo();
  }, []);

  const startEditing = () => {
    setEditInfo({
      ...userInfo,
      dob: formatDateForInput(userInfo.dob),
    });
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditInfo(null);
    if (original) setUserInfo(original);
  };

  const onChange = (field, value) => {
    setEditInfo((prev) => ({ ...prev, [field]: value }));
  };

  const saveChanges = async () => {
    if (!editInfo) return;
    setIsSaving(true);
    const userId = secureLocalStorage.getItem('id');

    const userPayload = {};
    const patientPayload = {};

    ['firstName', 'lastName', 'email'].forEach((k) => {
      if (editInfo[k] !== original[k]) userPayload[k] = editInfo[k];
    });

    if (editInfo.phone !== original.phone) patientPayload.phoneNumber = editInfo.phone;
    if (editInfo.dob !== formatDateForInput(original.dob))
      patientPayload.dateOfBirth = editInfo.dob || null;

    try {
      const promises = [];
      if (Object.keys(userPayload).length > 0) {
        promises.push(
          fetch(import.meta.env.VITE_BACKEND + 'api/users/' + userId, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userPayload),
          })
        );
      }
      if (Object.keys(patientPayload).length > 0) {
        promises.push(
          fetch(import.meta.env.VITE_BACKEND + 'api/patients/' + userId, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patientPayload),
          })
        );
      }
      await Promise.all(promises);
      const updated = { ...editInfo };
      setUserInfo(updated);
      setOriginal(updated);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert('There was an error saving your changes.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={styles.container}>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#4169E1' }}>Loading...</div>
      ) : (
        <>
          <div style={styles.headerSection}>
            <div
              style={{
                width: '6rem',
                height: '5.8rem',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #82ABF8, #4169E1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 4px 10px rgba(65,105,225,0.3)',
            }}
            >
            <img
              src={pfp}
              alt="Profile"
              style={{
                width: '78px',
                height: '78px',
                borderRadius: '45%',
                objectFit: 'cover',
              }}
            />
        </div>
            <h1 style={styles.username}>Your Profile</h1>
          </div>

          <div style={styles.infoCard}>
            <div style={styles.myInfoHeader}>
              <span>My Info</span>
              {!isEditing ? (
                <Edit size={20} style={styles.editIcon} onClick={startEditing} />
              ) : (
                <div style={styles.headerActions}>
                  <button style={styles.cancelBtn} onClick={cancelEditing} disabled={isSaving}>
                    <X size={16} /> Cancel
                  </button>
                  <button style={styles.saveBtn} onClick={saveChanges} disabled={isSaving}>
                    <Check size={16} /> {isSaving ? 'Saving...' : 'Save'}
                  </button>
                </div>
              )}
            </div>

            {!isEditing ? (
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
            ) : (
              <div style={styles.infoGrid}>
                <div style={styles.infoItem}>
                  <label style={styles.infoLabel}>First Name</label>
                  <input
                    style={styles.input}
                    type="text"
                    value={editInfo.firstName}
                    onChange={(e) => onChange('firstName', e.target.value)}
                  />
                </div>
                <div style={styles.infoItem}>
                  <label style={styles.infoLabel}>Last Name</label>
                  <input
                    style={styles.input}
                    type="text"
                    value={editInfo.lastName}
                    onChange={(e) => onChange('lastName', e.target.value)}
                  />
                </div>
                <div style={styles.infoItem}>
                  <label style={styles.infoLabel}>Email</label>
                  <input
                    style={styles.input}
                    type="email"
                    value={editInfo.email}
                    onChange={(e) => onChange('email', e.target.value)}
                  />
                </div>
                <div style={styles.infoItem}>
                  <label style={styles.infoLabel}>Phone Number</label>
                  <input
                    style={styles.input}
                    type="tel"
                    value={editInfo.phone}
                    onChange={(e) => onChange('phone', e.target.value)}
                  />
                </div>
                <div style={styles.infoItem}>
                  <label style={styles.infoLabel}>DOB</label>
                  <input
                    style={styles.input}
                    type="date"
                    value={editInfo.dob || ''}
                    onChange={(e) => onChange('dob', e.target.value)}
                  />
                </div>
                <div style={styles.infoItem}>
                  <label style={styles.infoLabel}>Role</label>
                  <input
                    style={styles.inputDisabled}
                    type="text"
                    value={editInfo.role}
                    disabled
                  />
                </div>
              </div>
            )}
          </div>

          <div style={styles.historyCard}>
            <div style={styles.historyHeader}>History of Appointments</div>
            {appointments.length === 0 ? (
              <div style={{ padding: '1rem 1.5rem', color: '#666' }}>No past appointments</div>
            ) : (
              appointments.map((apt, index) => {
                const aptDate = new Date(apt.scheduledStart);
                const dateStr = `${(aptDate.getMonth() + 1)
                  .toString()
                  .padStart(2, '0')}/${aptDate.getDate().toString().padStart(2, '0')}`;
                const timeStr = aptDate.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
                });
                return (
                  <div
                    key={apt.id}
                    style={{
                      ...styles.appointmentRow,
                      ...(index % 2 === 0
                        ? styles.appointmentRowPurple
                        : styles.appointmentRowWhite),
                    }}
                  >
                    <span style={styles.appointmentDate}>
                      {dateStr} | {timeStr}
                    </span>
                    <span style={styles.appointmentDoctor}>{apt.doctorName}</span>
                  </div>
                );
              })
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
