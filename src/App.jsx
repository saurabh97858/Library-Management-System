import { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import Books from './pages/Books';
import Students from './pages/Students';
import IssueReturn from './pages/IssueReturn';
import Publications from './pages/Publications';
import Branches from './pages/Branches';
import BookReport from './pages/BookReport';
import StudentReport from './pages/StudentReport';
import IssueReport from './pages/IssueReport';
import Penalty from './pages/Penalty';
import Toast from './components/Toast';
import StudentApp from './student/StudentApp';
import './index.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null); // 'admin' or 'student'
  const [loggedInStudent, setLoggedInStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState('welcome');
  const [books, setBooks] = useState([]);
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('lms_students');
    return saved ? JSON.parse(saved) : [];
  });
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [publications, setPublications] = useState([]);
  const [branches, setBranches] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = (username, password, selectedUserType) => {
    // Admin login
    if (selectedUserType === 'librarian' && username === 'admin' && password === 'admin') {
      setIsLoggedIn(true);
      setUserType('admin');
      setCurrentPage('dashboard');
      showToast('Welcome Admin! Login successful');
      return true;
    }
    // Student login - authenticate by roll number
    if (selectedUserType === 'student') {
      const savedStudents = JSON.parse(localStorage.getItem('lms_students') || '[]');
      const student = savedStudents.find(
        s => s.rollNumber === username && s.password === password
      );
      if (student) {
        setIsLoggedIn(true);
        setUserType('student');
        setLoggedInStudent(student);
        setCurrentPage('student-dashboard');
        showToast(`Welcome ${student.name}! Login successful`);
        return true;
      }
      showToast('Invalid Roll Number or Password!', 'error');
      return false;
    }
    showToast('Invalid credentials!', 'error');
    return false;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    setLoggedInStudent(null);
    setCurrentPage('welcome');
    showToast('Logged out successfully');
  };

  // Book operations
  const addBook = (book) => {
    setBooks([...books, { ...book, id: Date.now() }]);
    showToast('Book added successfully!');
  };

  const updateBook = (id, updatedBook) => {
    setBooks(books.map(book => book.id === id ? { ...updatedBook, id } : book));
    showToast('Book updated successfully!');
  };

  const deleteBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
    showToast('Book deleted successfully!');
  };

  // Student operations (with localStorage sync)
  const addStudent = (student) => {
    const newStudent = { ...student, id: Date.now() };
    const updated = [...students, newStudent];
    setStudents(updated);
    localStorage.setItem('lms_students', JSON.stringify(updated));
    showToast('Student added successfully!');
  };

  const updateStudent = (id, updatedStudent) => {
    const updated = students.map(student => student.id === id ? { ...updatedStudent, id } : student);
    setStudents(updated);
    localStorage.setItem('lms_students', JSON.stringify(updated));
    showToast('Student updated successfully!');
  };

  const deleteStudent = (id) => {
    const updated = students.filter(student => student.id !== id);
    setStudents(updated);
    localStorage.setItem('lms_students', JSON.stringify(updated));
    showToast('Student deleted successfully!');
  };

  // Publication operations
  const addPublication = (publication) => {
    setPublications([...publications, { ...publication, id: Date.now() }]);
    showToast('Publication added successfully!');
  };

  const updatePublication = (id, updatedPublication) => {
    setPublications(publications.map(pub => pub.id === id ? { ...updatedPublication, id } : pub));
    showToast('Publication updated successfully!');
  };

  const deletePublication = (id) => {
    setPublications(publications.filter(pub => pub.id !== id));
    showToast('Publication deleted successfully!');
  };

  // Branch operations
  const addBranch = (branch) => {
    setBranches([...branches, { ...branch, id: Date.now() }]);
    showToast('Branch added successfully!');
  };

  const updateBranch = (id, updatedBranch) => {
    setBranches(branches.map(branch => branch.id === id ? { ...updatedBranch, id } : branch));
    showToast('Branch updated successfully!');
  };

  const deleteBranch = (id) => {
    setBranches(branches.filter(branch => branch.id !== id));
    showToast('Branch deleted successfully!');
  };

  // Issue/Return operations
  const issueBook = (issue) => {
    const book = books.find(b => b.id === parseInt(issue.bookId));
    const student = students.find(s => s.id === parseInt(issue.studentId));

    if (!book || !student) {
      showToast('Invalid book or student selected!', 'error');
      return;
    }

    if (book.available <= 0) {
      showToast('Book is not available!', 'error');
      return;
    }

    setBooks(books.map(b =>
      b.id === parseInt(issue.bookId)
        ? { ...b, available: b.available - 1 }
        : b
    ));

    setIssuedBooks([...issuedBooks, {
      id: Date.now(),
      bookId: issue.bookId,
      bookName: book.title,
      studentId: issue.studentId,
      studentName: student.name,
      studentEnrollment: student.enrollment,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: issue.dueDate,
      status: 'issued',
      fine: 0
    }]);

    showToast('Book issued successfully!');
  };

  const returnBook = (id) => {
    const issued = issuedBooks.find(i => i.id === id);
    if (!issued) return;

    const returnDate = new Date();
    const dueDate = new Date(issued.dueDate);
    let fine = 0;

    // Calculate fine if overdue (₹10 per day)
    if (returnDate > dueDate) {
      const daysLate = Math.floor((returnDate - dueDate) / (1000 * 60 * 60 * 24));
      fine = daysLate * 10;
    }

    setBooks(books.map(b =>
      b.id === parseInt(issued.bookId)
        ? { ...b, available: b.available + 1 }
        : b
    ));

    setIssuedBooks(issuedBooks.map(i =>
      i.id === id
        ? {
          ...i,
          status: 'returned',
          returnDate: new Date().toISOString().split('T')[0],
          fine: fine
        }
        : i
    ));

    if (fine > 0) {
      showToast(`Book returned with ₹${fine} fine!`, 'warning');
    } else {
      showToast('Book returned successfully!');
    }
  };

  const renderPage = () => {
    if (!isLoggedIn && currentPage !== 'welcome') {
      return <Welcome onLogin={handleLogin} />;
    }

    switch (currentPage) {
      case 'welcome':
        return <Welcome onLogin={handleLogin} />;
      case 'dashboard':
        return <Dashboard
          books={books}
          students={students}
          issuedBooks={issuedBooks}
          publications={publications}
          branches={branches}
        />;
      case 'books':
        return <Books
          books={books}
          onAdd={addBook}
          onUpdate={updateBook}
          onDelete={deleteBook}
        />;
      case 'students':
        return <Students
          students={students}
          onAdd={addStudent}
          onUpdate={updateStudent}
          onDelete={deleteStudent}
        />;
      case 'publications':
        return <Publications
          publications={publications}
          onAdd={addPublication}
          onUpdate={updatePublication}
          onDelete={deletePublication}
        />;
      case 'branches':
        return <Branches
          branches={branches}
          onAdd={addBranch}
          onUpdate={updateBranch}
          onDelete={deleteBranch}
        />;
      case 'issue-return':
        return <IssueReturn
          books={books}
          students={students}
          issuedBooks={issuedBooks}
          onIssue={issueBook}
          onReturn={returnBook}
        />;
      case 'book-report':
        return <BookReport books={books} publications={publications} />;
      case 'student-report':
        return <StudentReport students={students} issuedBooks={issuedBooks} />;
      case 'issue-report':
        return <IssueReport issuedBooks={issuedBooks} />;
      case 'penalty':
        return <Penalty issuedBooks={issuedBooks} />;
      default:
        return <Welcome onLogin={handleLogin} />;
    }
  };

  return (
    <div className="app">
      {/* Student Portal */}
      {isLoggedIn && userType === 'student' && (
        <StudentApp onLogout={handleLogout} studentData={loggedInStudent} />
      )}

      {/* Admin Portal */}
      {(!isLoggedIn || userType === 'admin') && (
        <>
          {isLoggedIn && <Navbar onLogout={handleLogout} />}
          <div style={{ display: currentPage === 'welcome' ? 'block' : 'flex' }}>
            {isLoggedIn && currentPage !== 'welcome' && (
              <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
            )}
            <main style={isLoggedIn && currentPage !== 'welcome' ? {
              flex: 1,
              padding: '1.25rem',
              marginLeft: '250px',
              minHeight: 'calc(100vh - 60px)'
            } : {}}>
              {renderPage()}
            </main>
          </div>
        </>
      )}

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}

export default App;
