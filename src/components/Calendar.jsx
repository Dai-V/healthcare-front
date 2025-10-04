import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const containerStyle = {
   
  };

  const calendarBoxStyle = {
    backgroundColor: '#F6FAFFB2',
    borderRadius: '32px',
    padding: '32px',
    width: '320px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  };

  const navButtonStyle = {
    background: 'none',
    border: 'none',
    color: '#3A5FCF',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center'
  };

  const monthBadgeStyle = {
    backgroundColor: '#7ba7e8',
    color: 'white',
    padding: '8px 20px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '500'
  };

  const daysHeaderStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '8px',
    marginBottom: '12px'
  };

  const dayLabelStyle = {
    textAlign: 'center',
    color: '#3A5FCF',
    fontSize: '14px',
    fontWeight: '600',
    padding: '8px 0'
  };

  const daysGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '8px'
  };

  const getDayStyle = (day, isSelected) => ({
    aspectRatio: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    fontSize: '15px',
    fontWeight: '500',
    color: day ? (isSelected ? 'white' : '#3A5FCF') : 'transparent',
    backgroundColor: isSelected ? '#7ba7e8' : 'transparent',
    cursor: day ? 'pointer' : 'default',
    transition: 'all 0.2s ease',
    transform: isSelected ? 'scale(1.05)' : 'scale(1)'
  });

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    return { firstDay, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentDate);

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  return (
    <div style={containerStyle}>
      <div style={calendarBoxStyle}>
        <div style={headerStyle}>
          <button onClick={() => changeMonth(-1)} style={navButtonStyle}>
            <ChevronLeft size={20} />
          </button>
          
          <div style={monthBadgeStyle}>
            {monthNames[currentDate.getMonth()]}  {currentDate.getFullYear()}
          </div>

          <button onClick={() => changeMonth(1)} style={navButtonStyle}>
            <ChevronRight size={20} />
          </button>
        </div>

        <div style={daysHeaderStyle}>
          {daysOfWeek.map((day, index) => (
            <div key={index} style={dayLabelStyle}>
              {day}
            </div>
          ))}
        </div>

        <div style={daysGridStyle}>
          {calendarDays.map((day, index) => (
            <div
              key={index}
              onClick={() => day && setSelectedDate(day)}
              style={getDayStyle(day, day === selectedDate)}
              onMouseEnter={(e) => {
                if (day && day !== selectedDate) {
                  e.target.style.backgroundColor = '#b8d1f0';
                }
              }}
              onMouseLeave={(e) => {
                if (day && day !== selectedDate) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;