import Calendar from '../components/Calendar'
import HelloLogo from '../components/HelloLogo';
import NavMenu from '../components/NavMenu';



function DashboardDoctorPage() {
    const [id, setId] = useState(secureLocalStorage.getItem("id"));
    const [role, setRole] = useState(secureLocalStorage.getItem("role"));
    useEffect(() => {
    }, []);
    const body = {
        overflow: 'hidden', //prevent page break from extreme zooms
        position: 'relative',
        display: 'flex',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        minWidth: '100%',
        minHeight: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundImage: 'linear-gradient(to right, #F8EDE5 30.4%, #82ABF8 88.48%)',

    }

    return (
        <div style={body}>
            <Calendar />
            <HelloLogo />
            <NavMenu role={role} />
        </div>
    )

}
export default DashboardDoctorPage