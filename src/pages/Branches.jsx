import { useState } from 'react';
import '../pages/Books.css';

function Branches({ branches, onAdd, onUpdate, onDelete }) {
    const [showModal, setShowModal] = useState(false);
    const [editingBranch, setEditingBranch] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        contactPerson: '',
        phone: '',
        email: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingBranch) {
            onUpdate(editingBranch.id, formData);
        } else {
            onAdd(formData);
        }
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            name: '',
            contactPerson: '',
            phone: '',
            email: ''
        });
        setEditingBranch(null);
        setShowModal(false);
    };

    const handleEdit = (branch) => {
        setEditingBranch(branch);
        setFormData(branch);
        setShowModal(true);
    };

    const filteredBranches = branches.filter(branch =>
        branch.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="books-page">
            <div className="page-header">
                <div>
                    <h1>🏢 Academic Branches</h1>
                    <p className="subtitle">Manage academic streams and departments</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    ➕ Add Branch
                </button>
            </div>

            <div className="search-bar">
                <span className="search-icon">🔍</span>
                <input
                    type="text"
                    placeholder="Search by branch name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {filteredBranches.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">🏢</div>
                    <p className="empty-state-text">
                        {branches.length === 0 ? 'No branches added yet' : 'No branches found'}
                    </p>
                    {branches.length === 0 && (
                        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                            Add First Branch
                        </button>
                    )}
                </div>
            ) : (
                <div className="books-grid">
                    {filteredBranches.map(branch => (
                        <div key={branch.id} className="book-card">
                            <div className="book-header">
                                <h3 className="book-title">{branch.name}</h3>
                                <span className="badge badge-success">Active</span>
                            </div>
                            <div className="book-details">
                                <p><strong>Contact Person:</strong> {branch.contactPerson}</p>
                                <p><strong>Phone:</strong> {branch.phone}</p>
                                <p><strong>Email:</strong> {branch.email}</p>
                            </div>
                            <div className="book-actions">
                                <button className="btn btn-secondary btn-sm" onClick={() => handleEdit(branch)}>
                                    ✏️ Edit
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={() => onDelete(branch.id)}>
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
                        <h2>{editingBranch ? 'Edit Branch' : 'Add New Branch'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Branch Name * (e.g. CSE, ECE)</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Enter branch name"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Contact Person *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.contactPerson}
                                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                                    placeholder="Enter contact person name"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Phone *</label>
                                <input
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="Enter phone number"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email *</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="branch@example.com"
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {editingBranch ? 'Update' : 'Add Branch'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Branches;
