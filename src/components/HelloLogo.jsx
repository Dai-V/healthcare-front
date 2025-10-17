import { useEffect, useState } from 'react';
import secureLocalStorage from 'react-secure-storage';
import dashAnim from '../assets/dashboard_anim.gif';



function HelloLogo() {
  const [id, setId] = useState(secureLocalStorage.getItem("id"));
  const [role, setRole] = useState(secureLocalStorage.getItem("role"));
  const [firstName, setFirstName] = useState('');
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
    position: 'relative',
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    width: '100%',
    height: 'auto',
  }
  const gifSection = {
    position: 'absolute',
    zIndex: '11',
    width: '15%',
    marginTop: '-4%',
    marginLeft: '46%'

  }

  const textWrapper = {
    textAlign: 'left',
    width: '100%'
  }

  const hello = {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#3A5FCF',
  }
  const username = {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#3A5FCF',
  }

  return (
    <div style={logoContainer}>
      <div style={textWrapper}>
        <img src={dashAnim} style={gifSection}></img>
        <h1 style={hello}>
          Hello,
        </h1>
        <h2 style={username}>
          {role == 'doctor' ? 'Dr. ' : ''}{firstName} {lastName}
        </h2>
      </div>
    </div>
  )
}

export default HelloLogo