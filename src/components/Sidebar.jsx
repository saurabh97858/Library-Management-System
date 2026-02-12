import './Sidebar.css';

function Sidebar({ currentPage, setCurrentPage }) {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'publications', label: 'Publications', icon: '📰' },
        { id: 'books', label: 'Books', icon: '📖' },
        { id: 'book-report', label: 'Book Report', icon: '📈' },
        { id: 'branches', label: 'Branches', icon: '🏢' },
        { id: 'students', label: 'Students', icon: '👨‍🎓' },
        { id: 'student-report', label: 'Student Report', icon: '📊' },
        { id: 'issue-return', label: 'Issue/Return', icon: '🔄' },
        { id: 'issue-report', label: 'Issue Report', icon: '📋' },
        { id: 'penalty', label: 'Penalty', icon: '💰' },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-content">
                {menuItems.map(item => (
                    <button
                        key={item.id}
                        className={`sidebar-item ${currentPage === item.id ? 'active' : ''}`}
                        onClick={() => setCurrentPage(item.id)}
                    >
                        <span className="sidebar-icon">{item.icon}</span>
                        <span className="sidebar-label">{item.label}</span>
                    </button>
                ))}
            </div>
        </aside>
    );
}

export default Sidebar;
