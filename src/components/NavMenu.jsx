import React from 'react';

const styles = {
    container: {
        position: 'absolute',
        padding: '20px',
        background: '#F6FAFF',
        borderRadius: '24px',
        fontFamily: '"Montserrat", sans-serif',
        width: '20em',
        boxShadow: `
            0 6px 12px rgba(0, 0, 0, 0.3),
            0 12px 28px rgba(0, 0, 0, 0.25)
        `,
    },
    menuItem: {
        position: 'relative',
        width: '100%',
        padding: '14px 20px',
        marginBottom: '12px',
        background: 'white',
        border: 'none',
        borderRadius: '16px',
        fontSize: '15px',
        fontWeight: '500',
        color: '#5b7fb8',
        cursor: 'pointer',
        textAlign: 'center',
        boxShadow: `
            0 6px 12px rgba(0, 0, 0, 0.3),
            0 12px 28px rgba(0, 0, 0, 0.25)
        `,
        transition: 'all 0.2s ease',
    },
    activeItem: {
        background: '#82ABF8',
        color: 'white',
        boxShadow: `
            inset 3px 3px 6px rgba(0, 0, 0, 0.25),
            inset -3px -3px 6px rgba(255, 255, 255, 0.6)
        `,
        transition: 'all 0.2s ease',
    },
    badge: {
        position: 'absolute',
        top: '-6px',
        right: '-6px',
        width: '22px',
        height: '22px',
        background: '#ff6b6b',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '12px',
        fontWeight: '600',
        boxShadow: `
            0 6px 12px rgba(0, 0, 0, 0.3),
            0 12px 28px rgba(0, 0, 0, 0.25)
        `,
    },
    searchContainer: {
        position: 'relative',
        width: '100%',
    },
    searchInput: {
        width: '100%',
        padding: '14px 44px 14px 20px',
        border: 'none',
        borderRadius: '16px',
        fontSize: '15px',
        color: '#E3DCFF',
        boxShadow: `
            0 6px 12px rgba(0, 0, 0, 0.3),
            0 12px 28px rgba(0, 0, 0, 0.25)
        `,
        outline: 'none',
        appearance: 'none',
        WebkitAppearance: 'none',
        MozAppearance: 'none'
    },
    searchButton: {
        position: 'absolute',
        right: '8px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '32px',
        height: '32px',
        background: '#82ABF8',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease',
        boxShadow: `
            0 6px 14px rgba(0, 0, 0, 0.22),
            0 12px 28px rgba(0, 0, 0, 0.18)
        `,
    },
    searchIcon: {
        width: '16px',
        height: '16px',
        stroke: 'white',
        strokeWidth: '2.5',
        fill: 'none',
    },
};

const NavMenu = ({ role, activeView, onViewChange }) => {
    const [searchValue, setSearchValue] = React.useState('');

    const handleMenuClick = (view) => {
        if (onViewChange) {
            onViewChange(view);
        }
    };
    if (role == 'doctor')
        return (
            <div style={styles.container}>
                <div style={{ position: 'relative' }}>
                    <button
                        style={{
                            ...styles.menuItem,
                            ...(activeView === 'Appointments' ? styles.activeItem : {}),
                        }}
                        onClick={() => handleMenuClick('Appointments')}
                    >
                        Appointments
                    </button>
                </div>

                <button
                    style={{
                        ...styles.menuItem,
                        ...(activeView === 'Profile' ? styles.activeItem : {}),
                    }}
                    onClick={() => handleMenuClick('Profile')}
                >
                    Profile
                </button>

                <div style={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        style={styles.searchInput}
                    />
                    <button
                        style={styles.searchButton}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                        }}
                    >
                        <svg style={styles.searchIcon} viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8" />
                            <path d="M21 21l-4.35-4.35" />
                        </svg>
                    </button>
                </div>
            </div>
        );
    else
        return (
            <div style={styles.container}>
                <div style={{ position: 'relative' }}>
                    <button
                        style={{
                            ...styles.menuItem,
                            ...(activeView === 'Appointments' ? styles.activeItem : {}),
                        }}
                        onClick={() => handleMenuClick('Appointments')}
                    >
                        Appointments
                    </button>
                </div>
                <div style={{ position: 'relative' }}>
                    <button
                        style={{
                            ...styles.menuItem,
                            ...(activeView === 'Requests' ? styles.activeItem : {}),
                        }}
                        onClick={() => handleMenuClick('Requests')}
                    >
                        Requests
                    </button>
                    {/* <div style={styles.badge}>0</div> */}
                </div>

                <button
                    style={{
                        ...styles.menuItem,
                        ...(activeView === 'Profile' ? styles.activeItem : {}),
                    }}
                    onClick={() => handleMenuClick('Profile')}
                >
                    Profile
                </button>

                <div style={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        style={styles.searchInput}
                    />
                    <button
                        style={styles.searchButton}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                        }}
                    >
                        <svg style={styles.searchIcon} viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8" />
                            <path d="M21 21l-4.35-4.35" />
                        </svg>
                    </button>
                </div>
            </div>
        );
};

export default NavMenu;