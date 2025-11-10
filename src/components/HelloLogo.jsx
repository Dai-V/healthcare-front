import { useEffect, useState } from 'react';
import secureLocalStorage from 'react-secure-storage';
import dashAnim from '../assets/dashboard_anim.gif';



function HelloLogo() {
  const [id, setId] = useState(secureLocalStorage.getItem("id"));
  const [role, setRole] = useState(secureLocalStorage.getItem("role"));
  const [firstName, setFirstName] = useState('Loading...');
  const [lastName, setLastName] = useState('');
  useEffect(() => {
    async function fetchName() {
      const response = await fetch(import.meta.env.VITE_BACKEND + 'api/users/' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      if (data['id'] && data['firstName'] && data['lastName']) {
        setFirstName(data['firstName'])
        setLastName(data['lastName'])
      }
      else {
        setFirstName('John')
        setLastName('Doe')
      }
    }
    fetchName()
  }, []);




  const logoContainer = {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '10px',
    //width: '100%',
    width: 'clamp(10w, 15vw, 20vw)',
    height: 'auto',
    flexWrap: 'wrap',
    gap: '0.5rem',
  }
  const gifSection = {
    //position: 'relative',
    //zIndex: '11',
    width: 'clamp(6w, 7vw, 8vw)',
    //width: '15%',
    transform: 'translateY(3.4rem) translateX(6.6rem)',
    height: 'clamp(6vh, 11vh, 14vh)',
    //height: 'auto',
    flexShrink: 0,
  }

  const textWrapper = {
    textAlign: 'left',
    width: '100%'
  }

  const hello = {
    //fontSize: '3rem',
    fontSize: 'clamp(1.7rem, 2.5vw, 2.5rem)',
    fontWeight: 'bold',
    color: '#3A5FCF',
  }
  const username = {
    //fontSize: '3rem',
    fontSize: 'clamp(1.5rem, 2vw, 2rem)',
    fontWeight: 'bold',
    color: '#3A5FCF',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  }
  if (role == 'doctor')
    return (
      <div style={logoContainer}>
        <div style={textWrapper}>
          <img src={dashAnim} style={gifSection}></img>
          <h1 style={hello}>
            Hello,
          </h1>
          <h2 style={username}>
            Dr. {lastName}
          </h2>
        </div>
      </div>
    )
  else
    return (
      <div style={logoContainer}>
        <div style={textWrapper}>
          <img src={dashAnim} style={gifSection}></img>
          <h1 style={hello}>
            Hello,
          </h1>
          <h2 style={username}>
            {firstName} {lastName}
          </h2>
        </div>
      </div>
    )
}

export default HelloLogo