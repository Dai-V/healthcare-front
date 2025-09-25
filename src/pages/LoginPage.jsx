import LoginForm from '../components/LoginForm'


function LoginPage() {

    const body = {
        height:'100vh',
        width:'2000px',
backgroundImage: 'linear-gradient(to right, #F8EDE5 30.4%, #82ABF8 88.48%)',

    }
    
    return (
    <div style={body}>
    <p> Login </p>
    <LoginForm />
    </div>
    )
}
export default LoginPage