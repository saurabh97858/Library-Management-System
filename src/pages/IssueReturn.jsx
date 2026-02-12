import { useState } from 'react';
import './IssueReturn.css';

function IssueReturn({ books, students, issuedBooks, onIssue, onReturn }) {
    const [activeTab, setActiveTab] = useState('issue');
    const [formData, setFormData] = useState({
        bookId: '',
        studentId: '',
        dueDate: ''
    });

    const handleIssueSubmit = (e) => {
        e.preventDefault();
        onIssue(formData);
        setFormData({
            bookId: '',
            studentId: '',
            dueDate: ''
        });
    };

    const availableBooks = books.filter(b => b.available > 0);
    const activeIssuedBooks = issuedBooks.filter(i => i.status === 'issued');

    // Get default due date (7 days from now)
    const getDefaultDueDate = () => {
        const date = new Date();
        date.setDate(date.getDate() + 7);
        return date.toISOString().split('T')[0];
    };

    return (
        <div className="issue-return-page">
            <div className="page-header">
                <div>
                    <h1>🔄 Issue/Return Books</h1>
                    <p className="subtitle">Manage book transactions</p>
                </div>
            </div>

            <div className="tabs">
                <button
                    className={`tab ${activeTab === 'issue' ? 'active' : ''}`}
                    onClick={() => setActiveTab('issue')}
                >
                    📤 Issue Book
                </button>
                <button
                    className={`tab ${activeTab === 'return' ? 'active' : ''}`}
                    onClick={() => setActiveTab('return')}
                >
                    📥 Return Book
                </button>
                <button
                    className={`tab ${activeTab === 'history' ? 'active' : ''}`}
                    onClick={() => setActiveTab('history')}
                >
                    📜 History
                </button>
            </div>

            {activeTab === 'issue' && (
                <div className="tab-content">
                    {books.length === 0 || students.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">⚠️</div>
                            <p className="empty-state-text">
                                {books.length === 0 && students.length === 0
                                    ? 'Please add books and students first'
                                    : books.length === 0
                                        ? 'Please add books first'
                                        : 'Please add students first'}
                            </p>
                        </div>
                    ) : availableBooks.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">📚</div>
                            <p className="empty-state-text">No books available for issuing</p>
                        </div>
                    ) : (
                        <div className="issue-form-container">
                            <div className="card">
                                <h2>📤 Issue New Book</h2>
                                <form onSubmit={handleIssueSubmit}>
                                    <div className="form-group">
                                        <label className="form-label">Select Book *</label>
                                        <select
                                            required
                                            value={formData.bookId}
                                            onChange={(e) => setFormData({ ...formData, bookId: e.target.value })}
                                        >
                                            <option value="">Choose a book</option>
                                            {availableBooks.map(book => (
                                                <option key={book.id} value={book.id}>
                                                    {book.title} - {book.author} ({book.available} available)
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Select Student *</label>
                                        <select
                                            required
                                            value={formData.studentId}
                                            onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                                        >
                                            <option value="">Choose a student</option>
                                            {students.map(student => (
                                                <option key={student.id} value={student.id}>
                                                    {student.name} - {student.enrollment}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Due Date *</label>
                                        <input
                                            type="date"
                                            required
                                            min={new Date().toISOString().split('T')[0]}
                                            value={formData.dueDate || getDefaultDueDate()}
                                            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-full">
                                        📤 Issue Book
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'return' && (
                <div className="tab-content">
                    {activeIssuedBooks.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">📥</div>
                            <p className="empty-state-text">No issued books to return</p>
                        </div>
                    ) : (
                        <div className="issued-books-grid">
                            {activeIssuedBooks.map(issue => {
                                const dueDate = new Date(issue.dueDate);
                                const today = new Date();
                                const isOverdue = dueDate < today;

                                return (
                                    <div key={issue.id} className={`issue-card ${isOverdue ? 'overdue' : ''}`}>
                                        <div className="issue-header">
                                            <h3>{issue.bookName}</h3>
                                            <span className={`badge ${isOverdue ? 'badge-danger' : 'badge-success'}`}>
                                                {isOverdue ? 'Overdue' : 'Active'}
                                            </span>
                                        </div>
                                        <div className="issue-details">
                                            <p><strong>Student:</strong> {issue.studentName}</p>
                                            <p><strong>Issue Date:</strong> {issue.issueDate}</p>
                                            <p><strong>Due Date:</strong> {issue.dueDate}</p>
                                            {isOverdue && (
                                                <p className="overdue-text">
                                                    ⚠️ Overdue by {Math.floor((today - dueDate) / (1000 * 60 * 60 * 24))} days
                                                </p>
                                            )}
                                        </div>
                                        <button
                                            className="btn btn-success w-full"
                                            onClick={() => onReturn(issue.id)}
                                        >
                                            📥 Return Book
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'history' && (
                <div className="tab-content">
                    {issuedBooks.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">📜</div>
                            <p className="empty-state-text">No transaction history yet</p>
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
                                    {issuedBooks.slice().reverse().map(issue => (
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
            )}
        </div>
    );
}

export default IssueReturn;
