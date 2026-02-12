import '../pages/Dashboard.css';
import './Reports.css';

function BookReport({ books, publications }) {
    const totalBooks = books.reduce((sum, book) => sum + book.quantity, 0);
    const availableBooks = books.reduce((sum, book) => sum + book.available, 0);
    const issuedBooks = totalBooks - availableBooks;

    // Books by category
    const categoryStats = books.reduce((acc, book) => {
        acc[book.category] = (acc[book.category] || 0) + book.quantity;
        return acc;
    }, {});

    // Most popular books (by issued count)
    const popularBooks = books
        .map(book => ({
            ...book,
            issuedCount: book.quantity - book.available
        }))
        .filter(book => book.issuedCount > 0)
        .sort((a, b) => b.issuedCount - a.issuedCount)
        .slice(0, 5);

    return (
        <div className="dashboard">
            <div className="page-header">
                <h1>📈 Book Report</h1>
                <p className="subtitle">Comprehensive book statistics and analytics</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card stat-primary">
                    <div className="stat-icon">📚</div>
                    <div className="stat-details">
                        <h3 className="stat-title">Total Books</h3>
                        <div className="stat-value">{totalBooks}</div>
                        <p className="stat-subtitle">{books.length} unique titles</p>
                    </div>
                </div>
                <div className="stat-card stat-success">
                    <div className="stat-icon">✅</div>
                    <div className="stat-details">
                        <h3 className="stat-title">Available</h3>
                        <div className="stat-value">{availableBooks}</div>
                        <p className="stat-subtitle">Ready to issue</p>
                    </div>
                </div>
                <div className="stat-card stat-warning">
                    <div className="stat-icon">📖</div>
                    <div className="stat-details">
                        <h3 className="stat-title">Issued</h3>
                        <div className="stat-value">{issuedBooks}</div>
                        <p className="stat-subtitle">Currently borrowed</p>
                    </div>
                </div>
                <div className="stat-card stat-info">
                    <div className="stat-icon">📰</div>
                    <div className="stat-details">
                        <h3 className="stat-title">Publications</h3>
                        <div className="stat-value">{publications.length}</div>
                        <p className="stat-subtitle">Active subscriptions</p>
                    </div>
                </div>
            </div>

            <div className="report-grid">
                <div className="card">
                    <h2>📊 Books by Category</h2>
                    {Object.keys(categoryStats).length === 0 ? (
                        <div className="empty-state">
                            <p className="empty-state-text">No data available</p>
                        </div>
                    ) : (
                        <div className="category-list">
                            {Object.entries(categoryStats).map(([category, count]) => (
                                <div key={category} className="category-item">
                                    <div className="category-info">
                                        <span className="category-name">{category}</span>
                                        <span className="category-count">{count} books</span>
                                    </div>
                                    <div className="category-bar">
                                        <div
                                            className="category-fill"
                                            style={{ width: `${(count / totalBooks) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="card">
                    <h2>🔥 Most Popular Books</h2>
                    {popularBooks.length === 0 ? (
                        <div className="empty-state">
                            <p className="empty-state-text">No books issued yet</p>
                        </div>
                    ) : (
                        <div className="popular-list">
                            {popularBooks.map((book, index) => (
                                <div key={book.id} className="popular-item">
                                    <span className="popular-rank">#{index + 1}</span>
                                    <div className="popular-info">
                                        <div className="popular-title">{book.title}</div>
                                        <div className="popular-author">{book.author}</div>
                                    </div>
                                    <span className="badge badge-warning">
                                        {book.issuedCount} issued
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

export default BookReport;
