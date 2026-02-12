import { useState } from 'react';
import './Books.css';

function Books({ books, onAdd, onUpdate, onDelete }) {
    const [showModal, setShowModal] = useState(false);
    const [editingBook, setEditingBook] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        isbn: '',
        category: '',
        quantity: '',
        available: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const bookData = {
            ...formData,
            quantity: parseInt(formData.quantity),
            available: parseInt(formData.available)
        };

        if (editingBook) {
            onUpdate(editingBook.id, bookData);
        } else {
            onAdd(bookData);
        }

        resetForm();
    };

    const resetForm = () => {
        setFormData({
            title: '',
            author: '',
            isbn: '',
            category: '',
            quantity: '',
            available: ''
        });
        setEditingBook(null);
        setShowModal(false);
    };

    const handleEdit = (book) => {
        setEditingBook(book);
        setFormData({
            title: book.title,
            author: book.author,
            isbn: book.isbn,
            category: book.category,
            quantity: book.quantity.toString(),
            available: book.available.toString()
        });
        setShowModal(true);
    };

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="books-page">
            <div className="page-header">
                <div>
                    <h1>📚 Books Management</h1>
                    <p className="subtitle">Manage your library collection</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    ➕ Add New Book
                </button>
            </div>

            <div className="search-bar">
                <span className="search-icon">🔍</span>
                <input
                    type="text"
                    placeholder="Search by title, author, or ISBN..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {filteredBooks.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">📚</div>
                    <p className="empty-state-text">
                        {books.length === 0 ? 'No books in the library yet' : 'No books found matching your search'}
                    </p>
                    {books.length === 0 && (
                        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                            Add Your First Book
                        </button>
                    )}
                </div>
            ) : (
                <div className="books-grid">
                    {filteredBooks.map(book => (
                        <div key={book.id} className="book-card">
                            <div className="book-header">
                                <h3 className="book-title">{book.title}</h3>
                                <span className={`badge ${book.available > 0 ? 'badge-success' : 'badge-danger'}`}>
                                    {book.available > 0 ? 'Available' : 'Unavailable'}
                                </span>
                            </div>
                            <div className="book-details">
                                <p><strong>Author:</strong> {book.author}</p>
                                <p><strong>ISBN:</strong> {book.isbn}</p>
                                <p><strong>Category:</strong> {book.category}</p>
                                <p><strong>Copies:</strong> {book.available}/{book.quantity}</p>
                            </div>
                            <div className="book-actions">
                                <button className="btn btn-secondary btn-sm" onClick={() => handleEdit(book)}>
                                    ✏️ Edit
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={() => onDelete(book.id)}>
                                    🗑️ Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <div className="modal-overlay" onClick={resetForm}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h2>{editingBook ? 'Edit Book' : 'Add New Book'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Title *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Enter book title"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Author *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.author}
                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                    placeholder="Enter author name"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">ISBN *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.isbn}
                                    onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                                    placeholder="Enter ISBN number"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Category *</label>
                                <select
                                    required
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="">Select category</option>
                                    <option value="Fiction">Fiction</option>
                                    <option value="Non-Fiction">Non-Fiction</option>
                                    <option value="Science">Science</option>
                                    <option value="Technology">Technology</option>
                                    <option value="History">History</option>
                                    <option value="Biography">Biography</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Total Quantity *</label>
                                    <input
                                        type="number"
                                        required
                                        min="1"
                                        value={formData.quantity}
                                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                        placeholder="Total copies"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Available *</label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        value={formData.available}
                                        onChange={(e) => setFormData({ ...formData, available: e.target.value })}
                                        placeholder="Available copies"
                                    />
                                </div>
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {editingBook ? 'Update Book' : 'Add Book'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Books;
