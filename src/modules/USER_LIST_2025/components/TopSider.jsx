const TopSider = ({ isOpen, children }) => {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: isOpen ? '200px' : '0',
                background: '#001529',
                color: 'white',
                overflow: 'hidden',
                transition: 'height 0.3s ease',
                zIndex: 1000,
            }}
        >
            {isOpen && (
                <div style={{ padding: '20px' }}>
                    {children}
                </div>
            )}
        </div>
    );
};

export default TopSider;