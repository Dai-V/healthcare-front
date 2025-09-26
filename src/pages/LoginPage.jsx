import LoginForm from '../components/LoginForm'


function LoginPage() {

    const body = {
        position:'relative',
        display:'flex',
        height:'100vh',
backgroundImage: 'linear-gradient(to right, #F8EDE5 30.4%, #82ABF8 88.48%)',

    }
    
    return (
    <div style={body}>
    <LoginForm />
    </div>
    )
}
export default LoginPage