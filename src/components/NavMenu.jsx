import React from 'react';

const styles = {
    container: {
        position: 'absolute',
        padding: '20px',
        background: 'linear-gradient(135deg, #d4e3f7 0%, #c5d9f2 100%)',
        borderRadius: '24px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        width: '20em'
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
        boxShadow: '0 2px 8px rgba(91, 127, 184, 0.1)',
        transition: 'all 0.2s ease',
    },
    activeItem: {
        background: 'linear-gradient(135deg, #7ea7d8 0%, #a4c2e4 100%)',
        color: 'white',
        boxShadow: '0 4px 12px rgba(91, 127, 184, 0.25)',
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
        boxShadow: '0 2px 6px rgba(255, 107, 107, 0.4)',
    },
    searchContainer: {
        position: 'relative',
        width: '100%',
    },
    searchInput: {
        width: '100%',
        padding: '14px 44px 14px 20px',
        background: 'white',
        border: 'none',
        borderRadius: '16px',
        fontSize: '15px',
        color: '#5b7fb8',
        boxShadow: '0 2px 8px rgba(91, 127, 184, 0.1)',
        outline: 'none',
    },
    searchButton: {
        position: 'absolute',
        right: '8px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '32px',
        height: '32px',
        background: 'linear-gradient(135deg, #7ea7d8 0%, #a4c2e4 100%)',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease',
    },
    searchIcon: {
        width: '16px',
        height: '16px',
        stroke: 'white',
        strokeWidth: '2.5',
        fill: 'none',
    },
};

const NavMenu = (role) => {
    const [activeItem, setActiveItem] = React.useState('Appointments');
    const [searchValue, setSearchValue] = React.useState('');

    return (
        <div style={styles.container}>
            <div style={{ position: 'relative' }}>
                <button
                    style={{
                        ...styles.menuItem,
                        ...(activeItem === 'Appointments' ? styles.activeItem : {}),
                    }}
                    onClick={() => setActiveItem('Appointments')}
                >
                    Appointments
                </button>
            </div>

            <div style={{ position: 'relative' }}>
                <button
                    style={{
                        ...styles.menuItem,
                        ...(activeItem === 'Requests' ? styles.activeItem : {}),
                    }}
                    onClick={() => setActiveItem('Requests')}
                >
                    Requests
                </button>
                <div style={styles.badge}>0</div>
            </div>

            <button
                style={{
                    ...styles.menuItem,
                    ...(activeItem === 'Profile' ? styles.activeItem : {}),
                }}
                onClick={() => setActiveItem('Profile')}
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