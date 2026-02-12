import '../pages/Dashboard.css';
import './Reports.css';

function StudentReport({ students, issuedBooks }) {
    // Students by course
    const courseStats = students.reduce((acc, student) => {
        acc[student.course] = (acc[student.course] || 0) + 1;
        return acc;
    }, {});

    // Active borrowers (students with currently issued books)
    const activeBorrowers = students.filter(student =>
        issuedBooks.some(issue =>
            issue.studentId === student.id.toString() && issue.status === 'issued'
        )
    );

    // Top borrowers (by total books borrowed)
    const borrowerStats = students.map(student => {
        const borrowedCount = issuedBooks.filter(issue =>
            issue.studentId === student.id.toString()
        ).length;
        return { ...student, borrowedCount };
    }).filter(s => s.borrowedCount > 0)
        .sort((a, b) => b.borrowedCount - a.borrowedCount)
        .slice(0, 5);

    return (
        <div className="dashboard">
            <div className="page-header">
                <h1>📊 Student Report</h1>
                <p className="subtitle">Student statistics and borrowing patterns</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card stat-primary">
                    <div className="stat-icon">👨‍🎓</div>
                    <div className="stat-details">
                        <h3 className="stat-title">Total Students</h3>
                        <div className="stat-value">{students.length}</div>
                        <p className="stat-subtitle">Registered members</p>
                    </div>
                </div>
                <div className="stat-card stat-success">
                    <div className="stat-icon">📖</div>
                    <div className="stat-details">
                        <h3 className="stat-title">Active Borrowers</h3>
                        <div className="stat-value">{activeBorrowers.length}</div>
                        <p className="stat-subtitle">Currently have books</p>
                    </div>
                </div>
                <div className="stat-card stat-info">
                    <div className="stat-icon">🎓</div>
                    <div className="stat-details">
                        <h3 className="stat-title">Courses</h3>
                        <div className="stat-value">{Object.keys(courseStats).length}</div>
                        <p className="stat-subtitle">Different programs</p>
                    </div>
                </div>
                <div className="stat-card stat-warning">
                    <div className="stat-icon">📚</div>
                    <div className="stat-details">
                        <h3 className="stat-title">Total Borrows</h3>
                        <div className="stat-value">{issuedBooks.length}</div>
                        <p className="stat-subtitle">All time</p>
                    </div>
                </div>
            </div>

            <div className="report-grid">
                <div className="card">
                    <h2>🎓 Students by Course</h2>
                    {Object.keys(courseStats).length === 0 ? (
                        <div className="empty-state">
                            <p className="empty-state-text">No data available</p>
                        </div>
                    ) : (
                        <div className="category-list">
                            {Object.entries(courseStats).map(([course, count]) => (
                                <div key={course} className="category-item">
                                    <div className="category-info">
                                        <span className="category-name">{course}</span>
                                        <span className="category-count">{count} students</span>
                                    </div>
                                    <div className="category-bar">
                                        <div
                                            className="category-fill"
                                            style={{ width: `${(count / students.length) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="card">
                    <h2>⭐ Top Borrowers</h2>
                    {borrowerStats.length === 0 ? (
                        <div className="empty-state">
                            <p className="empty-state-text">No borrowing activity yet</p>
                        </div>
                    ) : (
                        <div className="popular-list">
                            {borrowerStats.map((student, index) => (
                                <div key={student.id} className="popular-item">
                                    <span className="popular-rank">#{index + 1}</span>
                                    <div className="popular-info">
                                        <div className="popular-title">{student.name}</div>
                                        <div className="popular-author">{student.enrollment}</div>
                                    </div>
                                    <span className="badge badge-info">
                                        {student.borrowedCount} books
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default StudentReport;
