import './Dashboard.css';

function Dashboard({ books, students, issuedBooks, publications, branches }) {
    const totalBooks = books.reduce((sum, book) => sum + book.quantity, 0);
    const availableBooks = books.reduce((sum, book) => sum + book.available, 0);
    const issuedCount = issuedBooks.filter(i => i.status === 'issued').length;

    const stats = [
        {
            title: 'Total Books',
            value: totalBooks,
            icon: '📚',
            color: 'primary',
            subtitle: `${books.length} unique titles`
        },
        {
            title: 'Available Books',
            value: availableBooks,
            icon: '✅',
            color: 'success',
            subtitle: 'Ready to issue'
        },
        {
            title: 'Issued Books',
            value: issuedCount,
            icon: '📖',
            color: 'warning',
            subtitle: 'Currently borrowed'
        },
        {
            title: 'Total Students',
            value: students.length,
            icon: '👨‍🎓',
            color: 'info',
            subtitle: 'Registered members'
        },
        {
            title: 'Publications',
            value: publications.length,
            icon: '📰',
            color: 'secondary',
            subtitle: 'Active subscriptions'
        },
        {
            title: 'Branches',
            value: branches.length,
            icon: '🏢',
            color: 'success',
            subtitle: 'Library locations'
        }
    ];

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <p className="subtitle">Welcome to Library Management System</p>
            </div>

            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className={`stat-card stat-${stat.color}`}>
                        <div className="stat-icon">{stat.icon}</div>
                        <div className="stat-details">
                            <h3 className="stat-title">{stat.title}</h3>
                            <div className="stat-value">{stat.value}</div>
                            <p className="stat-subtitle">{stat.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="dashboard-grid">
                <div className="card">
                    <h2>📚 Recent Books</h2>
                    {books.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">📚</div>
                            <p className="empty-state-text">No books added yet</p>
                        </div>
                    ) : (
                        <div className="recent-list">
                            {books.slice(-5).reverse().map(book => (
                                <div key={book.id} className="recent-item">
                                    <div>
                                        <div className="recent-title">{book.title}</div>
                                        <div className="recent-subtitle">{book.author}</div>
                                    </div>
                                    <span className={`badge ${book.available > 0 ? 'badge-success' : 'badge-danger'}`}>
                                        {book.available}/{book.quantity}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="card">
                    <h2>👨‍🎓 Recent Students</h2>
                    {students.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">👨‍🎓</div>
                            <p className="empty-state-text">No students registered yet</p>
                        </div>
                    ) : (
                        <div className="recent-list">
                            {students.slice(-5).reverse().map(student => (
                                <div key={student.id} className="recent-item">
                                    <div>
                                        <div className="recent-title">{student.name}</div>
                                        <div className="recent-subtitle">{student.email}</div>
                                    </div>
                                    <span className="badge badge-info">{student.course}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
