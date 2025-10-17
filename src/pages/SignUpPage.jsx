import LoginLogo from '../components/LoginLogo';
import SignUpForm from '../components/SignUpForm';

import { useEffect, useState } from "react";


function SignUpPage() {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isMobile = windowWidth < 768;
    const isTablet = windowWidth < 1024 && windowWidth >= 768;
    
    const body = {
        overflow: 'hidden', //prevent page break from extreme zooms
        position: 'relative',
        display: 'flex',
        justifyContent: isMobile ? 'flex-start' : 'space-between',
        flexDirection: isMobile || isTablet ? 'column' : 'row',
        top: 0,
        left: 0,
        width: '100vw',
        height: 'auto',
        minWidth: '100%',
        minHeight: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        scrollBehavior: 'smooth',
        padding: isMobile ? '24px 16px' : '40px 60px',
        gap: isMobile ? '32px' : isTablet ? '60px' : '120px',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundImage: 'linear-gradient(to right, #F8EDE5 30.4%, #82ABF8 88.48%)',
        WebkitOverflowScrolling: 'touch',

    }

    const responsiveContainer = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        gap: '40px',
        paddingBottom: '100px'
    };


    return (
        <div style={body}>
            {isMobile ? (
                <div style={responsiveContainer}>
                    <div style={{ marginBottom: "20px" }}>
                        <LoginLogo isMobile={isMobile} />
                    </div>
                    <SignUpForm />
                </div>
            ) : (
            <>
            <LoginLogo isMobile={isMobile} />
            <SignUpForm />
            </>
        )}
    </div>
);
}
export default SignUpPage