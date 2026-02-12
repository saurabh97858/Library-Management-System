import '../pages/Dashboard.css';
import '../pages/IssueReturn.css';

function IssueReport({ issuedBooks }) {
    const activeIssues = issuedBooks.filter(i => i.status === 'issued');
    const returnedBooks = issuedBooks.filter(i => i.status === 'returned');

    // Overdue books
    const overdueBooks = activeIssues.filter(issue => {
        const dueDate = new Date(issue.dueDate);
        const today = new Date();
        return dueDate < today;
    });

    // Recent issues (last 10)
    const recentIssues = [...issuedBooks].reverse().slice(0, 10);

    return (
        <div className="dashboard">
            <div className="page-header">
                <h1>📋 Issue Report</h1>
                <p className="subtitle">Book issue and return statistics</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card stat-warning">
                    <div className="stat-icon">📖</div>
                    <div className="stat-details">
                        <h3 className="stat-title">Currently Issued</h3>
                        <div className="stat-value">{activeIssues.length}</div>
                        <p className="stat-subtitle">Active borrows</p>
                    </div>
                </div>
                <div className="stat-card stat-danger">
                    <div className="stat-icon">⚠️</div>
                    <div className="stat-details">
                        <h3 className="stat-title">Overdue</h3>
                        <div className="stat-value">{overdueBooks.length}</div>
                        <p className="stat-subtitle">Require attention</p>
                    </div>
                </div>
                <div className="stat-card stat-success">
                    <div className="stat-icon">✅</div>
                    <div className="stat-details">
                        <h3 className="stat-title">Returned</h3>
                        <div className="stat-value">{returnedBooks.length}</div>
                        <p className="stat-subtitle">Completed transactions</p>
                    </div>
                </div>
                <div className="stat-card stat-info">
                    <div className="stat-icon">📚</div>
                    <div className="stat-details">
                        <h3 className="stat-title">Total Transactions</h3>
                        <div className="stat-value">{issuedBooks.length}</div>
                        <p className="stat-subtitle">All time</p>
                    </div>
                </div>
            </div>

            {overdueBooks.length > 0 && (
                <div className="card" style={{ marginBottom: '2rem', borderLeft: '4px solid var(--danger)' }}>
                    <h2>⚠️ Overdue Books</h2>
                    <div className="issued-books-grid">
                        {overdueBooks.map(issue => {
                            const dueDate = new Date(issue.dueDate);
                            const today = new Date();
                            const daysOverdue = Math.floor((today - dueDate) / (1000 * 60 * 60 * 24));

                            return (
                                <div key={issue.id} className="issue-card overdue">
                                    <div className="issue-header">
                                        <h3>{issue.bookName}</h3>
                                        <span className="badge badge-danger">Overdue</span>
                                    </div>
                                    <div className="issue-details">
                                        <p><strong>Student:</strong> {issue.studentName}</p>
                                        <p><strong>Due Date:</strong> {issue.dueDate}</p>
                                        <p className="overdue-text">
                                            ⚠️ Overdue by {daysOverdue} days (₹{daysOverdue * 10} fine)
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <div className="card">
                <h2>📜 Recent Transactions</h2>
                {recentIssues.length === 0 ? (
                    <div className="empty-state">
                        <p className="empty-state-text">No transactions yet</p>
                    </div>
                ) : (
                    <div className="history-table-container">
                        <table className="history-table">
                            <thead>
                                <tr>
                                    <th>Book</th>
                                    <th>Student</th>
                                    <th>Issue Date</th>
                                    <th>Due Date</th>
                                    <th>Return Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentIssues.map(issue => (
                                    <tr key={issue.id}>
                                        <td>{issue.bookName}</td>
                                        <td>{issue.studentName}</td>
                                        <td>{issue.issueDate}</td>
                                        <td>{issue.dueDate}</td>
                                        <td>{issue.returnDate || '-'}</td>
                                        <td>
                                            <span className={`badge ${issue.status === 'issued' ? 'badge-warning' : 'badge-success'}`}>
                                                {issue.status === 'issued' ? 'Issued' : 'Returned'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default IssueReport;
