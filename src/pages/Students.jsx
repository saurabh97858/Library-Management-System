import { useState } from 'react';
import './Students.css';

function Students({ students, onAdd, onUpdate, onDelete }) {
    const [showModal, setShowModal] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        course: '',
        enrollment: '',
        rollNumber: '',
        password: '12345'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check for duplicate roll number
        const duplicate = students.find(s =>
            s.rollNumber === formData.rollNumber &&
            (!editingStudent || s.id !== editingStudent.id)
        );
        if (duplicate) {
            alert('This Roll Number is already registered!');
            return;
        }
        if (editingStudent) {
            onUpdate(editingStudent.id, {
                ...formData,
                passwordChanged: editingStudent.passwordChanged || false
            });
        } else {
            onAdd({
                ...formData,
                password: formData.password || '12345',
                passwordChanged: false
            });
        }
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            course: '',
            enrollment: '',
            rollNumber: '',
            password: '12345'
        });
        setEditingStudent(null);
        setShowModal(false);
    };

    const handleEdit = (student) => {
        setEditingStudent(student);
        setFormData(student);
        setShowModal(true);
    };

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.enrollment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (student.rollNumber && student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="students-page">
            <div className="page-header">
                <div>
                    <h1>👨‍🎓 Students Management</h1>
                    <p className="subtitle">Manage registered students</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    ➕ Add New Student
                </button>
            </div>

            <div className="search-bar">
                <span className="search-icon">🔍</span>
                <input
                    type="text"
                    placeholder="Search by name, email, roll number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {filteredStudents.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">👨‍🎓</div>
                    <p className="empty-state-text">
                        {students.length === 0 ? 'No students registered yet' : 'No students found matching your search'}
                    </p>
                    {students.length === 0 && (
                        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                            Register First Student
                        </button>
                    )}
                </div>
            ) : (
                <div className="students-table-container">
                    <table className="students-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Roll Number</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Course</th>
                                <th>Password</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map(student => (
                                <tr key={student.id}>
                                    <td>
                                        <div className="student-name">
                                            <div className="student-avatar">
                                                {student.name.charAt(0).toUpperCase()}
                                            </div>
                                            {student.name}
                                        </div>
                                    </td>
                                    <td><span className="badge badge-info">{student.rollNumber || 'N/A'}</span></td>
                                    <td>{student.email}</td>
                                    <td>{student.phone}</td>
                                    <td>
                                        <span className="badge badge-info">{student.course}</span>
                                    </td>
                                    <td>
                                        <span className={`badge ${student.passwordChanged ? 'badge-success' : 'badge-warning'}`}>
                                            {student.passwordChanged ? 'Changed' : 'Default (12345)'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="table-actions">
                                            <button
                                                className="btn btn-secondary btn-sm"
                                                onClick={() => handleEdit(student)}
                                            >
                                                ✏️ Edit
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => onDelete(student.id)}
                                            >
                                                🗑️ Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {showModal && (
                <div className="modal-overlay" onClick={resetForm}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h2>{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Full Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Enter student name"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email *</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="student@example.com"
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
                                <label className="form-label">Course *</label>
                                <select
                                    required
                                    value={formData.course}
                                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                                >
                                    <option value="">Select course</option>
                                    <option value="Computer Science">Computer Science</option>
                                    <option value="Information Technology">Information Technology</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Mechanical">Mechanical</option>
                                    <option value="Civil">Civil</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Enrollment Number *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.enrollment}
                                    onChange={(e) => setFormData({ ...formData, enrollment: e.target.value })}
                                    placeholder="Enter enrollment number"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Roll Number * (for student login)</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.rollNumber}
                                    onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                                    placeholder="e.g., CS2024001"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Default Password</label>
                                <input
                                    type="text"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="Default: 12345"
                                />
                                <small style={{ color: '#999', fontSize: '12px' }}>Default password is 12345. Student can change after login.</small>
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {editingStudent ? 'Update Student' : 'Add Student'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Students;
