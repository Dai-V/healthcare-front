import loginAnim from '../assets/landing_anim.gif';
import logoOk from '../assets/logo_ok.png';
function LoginLogo({ isMobile }) {
const logoContainer = {
    position:'relative',
    margin:'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: isMobile ? '10px' : '20px',
    width: '100%',
    maxWidth: isMobile ? '200px' : '450px',
    maxHeight: isMobile ? '140px' : '250px',
    transform: isMobile ? 'translateY(-12px)' : 'translateY(0)',
}


const gifSection = {
    position:'absolute',
    zIndex:'11',
    maxWidth: isMobile ? '45%' : '40%',
    marginLeft: isMobile ? '22%' : '20%',
    marginBottom: isMobile ? '30%' : '27%',

}

return (
    <div style={logoContainer}>
        <img
            src={logoOk}
            alt="OK Health Logo"
            style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                transition: 'all 0.3s ease-in-out',
            }}
        />
        <img src={loginAnim} alt="Animated Pills" style={gifSection} />
    </div>
    );
}

export default LoginLogo;