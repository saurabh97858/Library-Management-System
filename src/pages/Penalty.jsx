import '../pages/Dashboard.css';
import './Reports.css';

function Penalty({ issuedBooks }) {
    // Calculate penalties
    const penaltyData = issuedBooks.map(issue => {
        if (issue.status === 'returned' && issue.fine > 0) {
            return {
                ...issue,
                paid: false // Can be enhanced with payment tracking
            };
        }

        if (issue.status === 'issued') {
            const dueDate = new Date(issue.dueDate);
            const today = new Date();
            if (today > dueDate) {
                const daysLate = Math.floor((today - dueDate) / (1000 * 60 * 60 * 24));
                const fine = daysLate * 10;
                return {
                    ...issue,
                    fine,
                    daysLate,
                    paid: false
                };
            }
        }
        return null;
    }).filter(Boolean);

    const totalFines = penaltyData.reduce((sum, item) => sum + item.fine, 0);
    const unpaidFines = penaltyData.filter(p => !p.paid);
    const paidFines = penaltyData.filter(p => p.paid);

    return (
        <div className="dashboard">
            <div className="page-header">
                <h1>💰 Penalty Management</h1>
                <p className="subtitle">Track and manage library fines</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card stat-warning">
                    <div className="stat-icon">💰</div>
                    <div className="stat-details">
                        <h3 className="stat-title">Total Fines</h3>
                        <div className="stat-value">₹{totalFines}</div>
                        <p className="stat-subtitle">All penalties</p>
                    </div>
                </div>
                <div className="stat-card stat-danger">
                    <div className="stat-icon">⚠️</div>
                    <div className="stat-details">
                        <h3 className="stat-title">Unpaid</h3>
                        <div className="stat-value">₹{unpaidFines.reduce((sum, p) => sum + p.fine, 0)}</div>
                        <p className="stat-subtitle">{unpaidFines.length} outstanding</p>
                    </div>
                </div>
                <div className="stat-card stat-success">
                    <div className="stat-icon">✅</div>
                    <div className="stat-details">
                        <h3 className="stat-title">Paid</h3>
                        <div className="stat-value">₹{paidFines.reduce((sum, p) => sum + p.fine, 0)}</div>
                        <p className="stat-subtitle">{paidFines.length} cleared</p>
                    </div>
                </div>
                <div className="stat-card stat-info">
                    <div className="stat-icon">📋</div>
                    <div className="stat-details">
                        <h3 className="stat-title">Fine Rate</h3>
                        <div className="stat-value">₹10</div>
                        <p className="stat-subtitle">Per day overdue</p>
                    </div>
                </div>
            </div>

            <div className="card">
                <h2>📋 Outstanding Fines</h2>
                {penaltyData.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">✨</div>
                        <p className="empty-state-text">No penalties! All books returned on time.</p>
                    </div>
                ) : (
                    <div className="penalty-table-container">
                        <table className="history-table">
                            <thead>
                                <tr>
                                    <th>Student</th>
                                    <th>Enrollment</th>
                                    <th>Book</th>
                                    <th>Due Date</th>
                                    <th>Days Late</th>
                                    <th>Fine Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {penaltyData.map(penalty => (
                                    <tr key={penalty.id}>
                                        <td>{penalty.studentName}</td>
                                        <td>{penalty.studentEnrollment}</td>
                                        <td>{penalty.bookName}</td>
                                        <td>{penalty.dueDate}</td>
                                        <td>
                                            <span className="badge badge-danger">
                                                {penalty.daysLate || Math.floor((new Date(penalty.returnDate) - new Date(penalty.dueDate)) / (1000 * 60 * 60 * 24))} days
                                            </span>
                                        </td>
                                        <td>
                                            <strong style={{ color: 'var(--danger)' }}>₹{penalty.fine}</strong>
                                        </td>
                                        <td>
                                            {penalty.status === 'returned' ? (
                                                <span className="badge badge-success">Returned</span>
                                            ) : (
                                                <span className="badge badge-warning">Active</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div className="card" style={{ marginTop: '2rem', background: 'var(--bg-tertiary)' }}>
                <h3>ℹ️ Fine Calculation Policy</h3>
                <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <p>• Fine rate: ₹10 per day for overdue books</p>
                    <p>• Calculation starts from the day after due date</p>
                    <p>• Fines are calculated automatically on return</p>
                    <p>• Students with unpaid fines may have borrowing privileges suspended</p>
                </div>
            </div>
        </div>
    );
}

export default Penalty;
