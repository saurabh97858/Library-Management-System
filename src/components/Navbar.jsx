import './Navbar.css';

function Navbar({ onLogout }) {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <div className="logo-icon">📚</div>
                    <h1 className="logo-text">Library Management</h1>
                </div>
                <div className="navbar-right">
                    <div className="user-profile">
                        <div className="user-avatar">A</div>
                        <span className="user-name">Admin</span>
                    </div>
                    <button className="btn-logout" onClick={onLogout}>
                        🚪 Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
