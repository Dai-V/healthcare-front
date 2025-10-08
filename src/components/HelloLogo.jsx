import secureLocalStorage from 'react-secure-storage';
import { Link,Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import dashAnim from '../assets/dashboard_anim.gif';



function HelloLogo() {
    const [id, setId] = useState(null);
    const [role, setRole] = useState(null);
  useEffect(() => {
    setId(secureLocalStorage.getItem("id"))
    setRole(secureLocalStorage.getItem("role"))
}, []); 

const logoContainer = {
    display:'flex',
    position:'relative',
    margin:'auto',
    alignItems: 'center',
    justifyContent: 'center',
    padding:'200px',
    width: '100%',
    maxWidth: '450px',
    height: 'auto',
    maxHeight: '250px',
}
const gifSection = {
    position:'absolute',
    zIndex:'11',
    width:'40%',
   marginTop:'-20%',
   marginLeft:'20%'
   
}

const textWrapper = {
      textAlign: 'center'
    }

const hello = {
      fontSize: '3rem',
      fontWeight: 'bold',
      color: '#2563eb',
      textAlign:'left'
    }
const username = {
      fontSize: '3rem',
      fontWeight: 'bold',
      color: '#1d4ed8',
      textAlign:'left'
    }

return (
    <div style={logoContainer}>
        <div style={textWrapper}>
               <img src={dashAnim} style={gifSection}></img>
        <h1 style={hello}>
          Hello,  
        </h1>
        <h2 style={username}>
           {role == 'doctor' ? 'Dr. Username!' : 'Username!'}
        </h2>
      </div>
    </div>
)
}

export default HelloLogo