import LoginForm from '../components/LoginForm';
import LoginLogo from '../components/LoginLogo';

import { useEffect, useState } from "react";


function LoginPage() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    }, []);

    const body = {
        overflow: 'hidden', //prevent page break from extreme zooms
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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

    const responsiveContainer = {
        display: 'flex',
        flexDirection: 'column',            // stacked for mobile
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    };

    return (
        <div style={body}>
            {isMobile ? (
                <div style={responsiveContainer}>
                    <div style={{ marginBottom: "40px" }}>
                        <LoginLogo isMobile={isMobile} />
                    </div>
                    <LoginForm />
                </div>
            ) : (
            <>
            <LoginLogo isMobile={isMobile} />
            <LoginForm />
        </>
    )}
    </div>
    );
}
export default LoginPage