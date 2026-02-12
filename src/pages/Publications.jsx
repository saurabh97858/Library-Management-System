import { useState } from 'react';
import '../pages/Books.css';

function Publications({ publications, onAdd, onUpdate, onDelete }) {
    const [showModal, setShowModal] = useState(false);
    const [editingPublication, setEditingPublication] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        publisher: '',
        type: '',
        frequency: '',
        contact: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingPublication) {
            onUpdate(editingPublication.id, formData);
        } else {
            onAdd(formData);
        }
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            name: '',
            publisher: '',
            type: '',
            frequency: '',
            contact: ''
        });
        setEditingPublication(null);
        setShowModal(false);
    };

    const handleEdit = (publication) => {
        setEditingPublication(publication);
        setFormData(publication);
        setShowModal(true);
    };

    const filteredPublications = publications.filter(pub =>
        pub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.publisher.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="books-page">
            <div className="page-header">
                <div>
                    <h1>📰 Publications Management</h1>
                    <p className="subtitle">Manage library publications and periodicals</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    ➕ Add Publication
                </button>
            </div>

            <div className="search-bar">
                <span className="search-icon">🔍</span>
                <input
                    type="text"
                    placeholder="Search by name or publisher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {filteredPublications.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">📰</div>
                    <p className="empty-state-text">
                        {publications.length === 0 ? 'No publications added yet' : 'No publications found'}
                    </p>
                    {publications.length === 0 && (
                        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                            Add First Publication
                        </button>
                    )}
                </div>
            ) : (
                <div className="books-grid">
                    {filteredPublications.map(pub => (
                        <div key={pub.id} className="book-card">
                            <div className="book-header">
                                <h3 className="book-title">{pub.name}</h3>
                                <span className="badge badge-info">{pub.type}</span>
                            </div>
                            <div className="book-details">
                                <p><strong>Publisher:</strong> {pub.publisher}</p>
                                <p><strong>Frequency:</strong> {pub.frequency}</p>
                                <p><strong>Contact:</strong> {pub.contact}</p>
                            </div>
                            <div className="book-actions">
                                <button className="btn btn-secondary btn-sm" onClick={() => handleEdit(pub)}>
                                    ✏️ Edit
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={() => onDelete(pub.id)}>
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
                        <h2>{editingPublication ? 'Edit Publication' : 'Add New Publication'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Publication Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Enter publication name"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Publisher *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.publisher}
                                    onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                                    placeholder="Enter publisher name"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Type *</label>
                                <select
                                    required
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                >
                                    <option value="">Select type</option>
                                    <option value="Magazine">Magazine</option>
                                    <option value="Journal">Journal</option>
                                    <option value="Newspaper">Newspaper</option>
                                    <option value="Newsletter">Newsletter</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Frequency *</label>
                                <select
                                    required
                                    value={formData.frequency}
                                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                                >
                                    <option value="">Select frequency</option>
                                    <option value="Daily">Daily</option>
                                    <option value="Weekly">Weekly</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Quarterly">Quarterly</option>
                                    <option value="Yearly">Yearly</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Contact Info *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.contact}
                                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                    placeholder="Email or phone"
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {editingPublication ? 'Update' : 'Add Publication'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Publications;
