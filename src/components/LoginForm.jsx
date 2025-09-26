import React, { useState } from 'react';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    console.log('Login attempt:', { email, password });
  };

  const containerStyle = {
    margin:'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  const titleStyle = {
    color: '#3A5FCF',
    fontSize: '64px',
    fontWeight: '400',
    textAlign: 'center',    
    marginBottom: '40px',
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
    color:'#7A9BE9',
    marginBottom: '16px',
    outline: 'none',
    boxSizing: 'border-box',
    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
    WebkitBoxShadow: '0 0 0 1000px #9FBFFA inset',
    WebkitTextFillColor: '#1e40af',
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
    color: '#1e40af',
    padding: '4px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const submitButtonContainerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '8px'
  };

  const submitButtonStyle = {
    backgroundColor: '#60a5fa',
    border: 'none',
    borderRadius: '18px',
    padding: '14px 16px',
    cursor: 'pointer',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const forgotPasswordStyle = {
    textAlign: 'center',
    marginTop: '32px'
  };

  const forgotPasswordLinkStyle = {
    color: '#3A5FCF',
    fontSize: '18px',
    textDecoration: 'none',
    cursor: 'pointer',
    
  };



  return (
    <div style={containerStyle}>
      <div>
        <h1 style={titleStyle}>Log In</h1>
        <div style={formContainerStyle}>
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
                style={{
                  ...passwordInputStyle,
                }}
              />
              <button
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
        </div>
        
        <div style={forgotPasswordStyle}>
          <a href="#" style={forgotPasswordLinkStyle}>
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;