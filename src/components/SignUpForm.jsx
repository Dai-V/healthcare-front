import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
  import { Link } from 'react-router-dom';

const SignUpForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);



  const containerStyle = {
    margin:'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: '"Montserrat", sans-serif',
  };

  const titleStyle = {
    color: '#3A5FCF',
    fontSize: '64px',
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: '5px',
    letterSpacing: '1px'
  };

  const formContainerStyle = {
    backgroundColor: 'rgba(229, 231, 235, 0.95)',
    borderRadius: '28px',
    padding: '32px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    width: '100%',
    maxWidth: '380px',
    backdropFilter: 'blur(8px)'
  };

  const inputStyle = {
    width: '100%',
    padding: '18px 22px',
    backgroundColor: '#9FBFFA',
    border: 'none',
    borderRadius: '22px',
    fontSize: '16px',
    color:'#82ABF8',
    marginBottom: '16px',
    outline: 'none',
    boxSizing: 'border-box',
    boxShadow: `
    inset 4px 4px 12px rgba(0, 0, 0, 0.25),
    inset -4px -4px 12px rgba(255, 255, 255, 0.6)
    `,
    //WebkitBoxShadow: '0 0 0 1000px #9FBFFA inset',
    WebkitTextFillColor: '#3A5FCF',
    transition: 'background-color 5000s ease-in-out 0s'
  };

  const passwordContainerStyle = {
    position: 'relative',
    marginBottom: '20px'
  };

  const passwordInputStyle = {
    ...inputStyle,
    paddingRight: '55px',
    marginBottom: '0'
  };

  const eyeButtonStyle = {
    position: 'absolute',
    right: '18px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#3A5FCF',
    padding: '4px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const submitButtonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '5px',
    
  };

  const submitButtonStyle = {
    backgroundColor: '#82ABF8',
    border: 'none',
    borderRadius: '18px',
    padding: '14px 25px',
    cursor: 'pointer',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const forgotPasswordStyle = {
    textAlign: 'center',
    marginTop: '10px',
    marginLeft: '5px'
  };



  const signUpLinkStyle = {
    color: '#3A5FCF',
    fontSize: '16px',
    textDecoration: 'none',
    cursor: 'pointer',
  };

function SignUp() {
 console.log('a')
}

  return (
    <div style={containerStyle}>
      <div>
        <h1 style={titleStyle}>Sign Up</h1>
        <form action={SignUp} style={formContainerStyle} >
          <div>

             <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              style={{
                ...inputStyle,
              }}
            />
             <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              style={{
                ...inputStyle,
              }}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              style={{
                ...inputStyle,
              }}
            />
            <div style={passwordContainerStyle}>
              <input 
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoComplete="new-password"
                style={{
                  ...passwordInputStyle,
                }}
              />
              <button
              type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={eyeButtonStyle}
                
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(30, 64, 175, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            <div style={passwordContainerStyle}>
              <input
              
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                style={{
                  ...passwordInputStyle,
                }}
              />
              <button
              type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={eyeButtonStyle}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(30, 64, 175, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
             
            </div>
            
             
              <div style={submitButtonContainerStyle}>
              <button
                style={submitButtonStyle}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#3b82f6';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#60a5fa';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                <ArrowRight size={20} color="white" />
              </button>
            </div>
          </div>
           </form>
        <div style={forgotPasswordStyle}>  
                 <Link to="/login" style={signUpLinkStyle}>
                  Don't have an account? Sign Up
                </Link>
               
     </div>
    </div>
    </div>
  );
};

export default SignUpForm;