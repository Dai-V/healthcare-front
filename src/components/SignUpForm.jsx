import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [sex, setSex] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate()

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePhoneNumberChange = (e) => {
    const input = e.target.value;

    // Remove all non-digit characters
    const cleaned = input.replace(/\D/g, '');

    // Limit to 10 digits
    const limited = cleaned.slice(0, 10);

    // Format as xxx-xxx-xxxx
    let formatted = limited;
    if (limited.length > 6) {
      formatted = `${limited.slice(0, 3)}-${limited.slice(3, 6)}-${limited.slice(6)}`;
    } else if (limited.length > 3) {
      formatted = `${limited.slice(0, 3)}-${limited.slice(3)}`;
    }

    setPhoneNumber(formatted);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login attempt:')
    signUp()
  };

  const containerStyle = {
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: '"Montserrat", sans-serif',
  };

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
    gap: '16px',
    justifyItems: 'stretch',
    alignItems: 'stretch',
  };

  const columnStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
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
    maxWidth: isMobile ? '380px' : '740px',
    backdropFilter: 'blur(8px)'
  };

  const inputStyle = {
    width: '100%',
    padding: '18px 22px',
    backgroundColor: '#9FBFFA',
    border: 'none',
    borderRadius: '22px',
    fontSize: '14px',
    color: '#82ABF8',
    marginBottom: '12px',
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
    marginBottom: '0px',
    height: '100%'
  };

  const passwordInputStyle = {
    ...inputStyle,
    paddingRight: '55px',
    marginBottom: '0'
  };

  const eyeButtonStyle = {
    position: 'absolute',
    right: '18px',
    top: '20%',
    //transform: 'translateY(-150%)',
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

  const footerStyle = {
    textAlign: 'center',
    marginTop: '18px',
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

  async function signUp() {
    if (sex == '') {
      setSex('Other')
    }
    const response = await fetch(import.meta.env.VITE_BACKEND + 'api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'firstName': firstName,
        'lastName': lastName,
        'email': email,
        'password': password,
        'dateOfBirth': dateOfBirth,
        'sex': sex,
        'phoneNumber': phoneNumber
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    if (data['id'] && data['role']) {
      navigate('/login')
    }
    else {
      throw new Error('Error parsing data')
    }
  }

  return (
    <div style={containerStyle}>
      <div>
        <h1 style={titleStyle}>Sign Up</h1>

        <form onSubmit={handleSubmit} style={formContainerStyle}>
          <div style={gridContainerStyle}>
            <div style={columnStyle}>
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" style={inputStyle} />
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" style={inputStyle} />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" style={inputStyle} />
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                max={new Date(new Date().setDate(new Date().getDate() - 1))
                  .toISOString()
                  .split("T")[0]}
                placeholder="Date of Birth"
                style={{
                  ...inputStyle,
                  colorScheme: 'light',
                }}
              />
            </div>
            <div style={columnStyle}>
              <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder="Phone Number XXX-XXX-XXXX"
                style={inputStyle}
                maxLength="12"
              />

              <select value={sex} onChange={(e) => setSex(e.target.value)} style={{ ...inputStyle, cursor: 'pointer', fontWeight: '500' }}>
                <option value="" disabled hidden>Select Sex</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <div style={passwordContainerStyle}>
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" style={passwordInputStyle} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={eyeButtonStyle}>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div style={passwordContainerStyle}>
                <input type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" style={passwordInputStyle} />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={eyeButtonStyle}>
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>

          <div style={submitButtonContainerStyle}>
            <button
              type="submit"
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
        </form>
        <div style={footerStyle}>
          <Link to="/login" style={signUpLinkStyle}>
            Already have an account? <u>Login</u>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SignUpForm;