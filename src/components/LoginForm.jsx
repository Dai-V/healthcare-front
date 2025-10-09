import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import secureLocalStorage from "react-secure-storage";
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login attempt:')
    login()
  };

  const containerStyle = {
    margin: 'auto',
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
    color: '#82ABF8',
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
    top: '33%',
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

  const forgotPasswordLinkStyle = {
    color: '#3A5FCF',
    fontSize: '14px',
    textDecoration: 'none',
    cursor: 'pointer',
  };

  const signUpLinkStyle = {
    color: '#3A5FCF',
    fontSize: '16px',
    textDecoration: 'none',
    cursor: 'pointer',
  };

  async function login() {
    const response = await fetch(import.meta.env.VITE_BACKEND + 'api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'email': email,
        'password': password
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()

    if (data['id'] && data['role']) {
      secureLocalStorage.setItem("id", data.id)
      secureLocalStorage.setItem("role", data.role.toLowerCase())
      navigate('/dashboard')
    }
    else {
      throw new Error('error parsing data')
    }
  }

  return (
    <div style={containerStyle}>
      <div>
        <h1 style={titleStyle}>Log In</h1>
        <form action={login} style={formContainerStyle}>
          <div>
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
                autoComplete='new-password'
                style={{
                  ...passwordInputStyle,
                }}
              />
              <button
                type='button'
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
              <div style={forgotPasswordStyle}>
                <a href="#" style={forgotPasswordLinkStyle}>
                  Forgot Password?
                </a>
              </div>
            </div>
            <div style={submitButtonContainerStyle}>
              <button
                onClick={handleSubmit}
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
          <Link to="/signup" style={signUpLinkStyle}>
            Don't have an account? Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;