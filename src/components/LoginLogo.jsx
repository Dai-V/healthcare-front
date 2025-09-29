import loginAnim from '../assets/landing_anim.gif';
import logoOk from '../assets/logo_ok.png';
function LoginLogo() {
const logoContainer = {
    position:'relative',
    margin:'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    width: '100%',
    maxWidth: '450px',
    height: 'auto',
    maxHeight: '250px',
}


const gifSection = {
    position:'absolute',
    zIndex:'11',
    maxWidth:'40%',
    marginLeft:'20%',
    marginBottom:'27%',

}

return (
    <div style={logoContainer}>
        <img src={logoOk}></img>
        <img src={loginAnim} style={gifSection}></img>
    </div>
)
}

export default LoginLogo;