import { useState, useEffect } from 'react';
import './Welcome.css';

function Welcome({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('librarian');
  const [isLoading, setIsLoading] = useState(false);
  const [typedText, setTypedText] = useState('');

  // Typing animation for tagline
  const fullText = 'A complete solution for managing your library';
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 40);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onLogin(username, password, userType);
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="welcome-page">
      {/* Animated Background */}
      <div className="bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
        <div className="shape shape-5"></div>
      </div>

      {/* Floating Particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 10 + 8}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Book Icons */}
      <div className="floating-icons">
        <span className="float-icon" style={{ top: '8%', left: '5%', animationDelay: '0s' }}>📚</span>
        <span className="float-icon" style={{ top: '18%', right: '8%', animationDelay: '1s' }}>📖</span>
        <span className="float-icon" style={{ bottom: '12%', left: '8%', animationDelay: '2s' }}>🎓</span>
        <span className="float-icon" style={{ bottom: '22%', right: '5%', animationDelay: '0.5s' }}>📕</span>
        <span className="float-icon" style={{ top: '55%', left: '3%', animationDelay: '1.5s' }}>✨</span>
        <span className="float-icon" style={{ top: '38%', right: '3%', animationDelay: '2.5s' }}>🏛️</span>
      </div>

      <div className="welcome-container">
        {/* Left Side - Branding */}
        <div className="welcome-left">
          <div className="brand-section">
            <div className="brand-icon">
              <span>📚</span>
              <div className="brand-icon-glow"></div>
            </div>
            <h1 className="brand-title">Digital Library</h1>
            <p className="brand-subtitle">Management System</p>
            <div className="brand-divider">
              <div className="divider-glow"></div>
            </div>
            <p className="brand-description">
              {typedText}<span className="typing-cursor">|</span>
            </p>
            <div className="brand-features">
              <div className="feature-item">
                <span className="feature-icon">📖</span>
                <span>Book Management</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">👨‍🎓</span>
                <span>Student Records</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📊</span>
                <span>Smart Reports</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🔔</span>
                <span>Due Reminders</span>
              </div>
            </div>

            {/* Stats */}
            <div className="brand-stats">
              <div className="stat-item">
                <span className="stat-number">∞</span>
                <span className="stat-label">Books</span>
              </div>
              <div className="stat-divider-v"></div>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Access</span>
              </div>
              <div className="stat-divider-v"></div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Digital</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="welcome-right">
          <div className="login-card">
            <div className="login-card-glow"></div>
            <div className="login-card-inner">
              <div className="login-card-header">
                <div className="login-icon-circle">
                  <span>{userType === 'librarian' ? '👨‍💼' : '👨‍🎓'}</span>
                </div>
                <h2 className="login-title">Welcome Back</h2>
                <p className="login-subtitle">Sign in to continue to your dashboard</p>
              </div>

              {/* User Type Toggle */}
              <div className="user-type-toggle">
                <button
                  type="button"
                  className={`toggle-btn ${userType === 'librarian' ? 'active' : ''}`}
                  onClick={() => setUserType('librarian')}
                >
                  <span className="toggle-icon">🏛️</span>
                  Librarian
                </button>
                <button
                  type="button"
                  className={`toggle-btn ${userType === 'student' ? 'active' : ''}`}
                  onClick={() => setUserType('student')}
                >
                  <span className="toggle-icon">🎓</span>
                  Student
                </button>
                <div className={`toggle-slider ${userType === 'student' ? 'right' : ''}`}></div>
              </div>

              <form onSubmit={handleSubmit} className="login-form">
                <div className="input-group">
                  <label className="input-label">
                    {userType === 'student' ? '🆔 Roll Number' : '👤 Username'}
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder={userType === 'librarian' ? 'Enter admin username' : 'Enter your roll number'}
                      className="login-input"
                    />
                    <div className="input-glow"></div>
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">🔒 Password</label>
                  <div className="input-wrapper">
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={userType === 'librarian' ? 'Enter password' : 'Default: 12345'}
                      className="login-input"
                    />
                    <div className="input-glow"></div>
                  </div>
                </div>

                <button type="submit" className={`login-btn ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
                  {isLoading ? (
                    <span className="btn-loader"></span>
                  ) : (
                    <>
                      Sign In
                      <span className="btn-arrow">→</span>
                    </>
                  )}
                  <div className="btn-shimmer"></div>
                </button>
              </form>

              <div className="login-footer">
                <p>
                  {userType === 'librarian'
                    ? '🔐 Admin credentials required'
                    : '🆔 Use your roll number to login'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="welcome-bottom">
        <p>© 2026 Digital Library Management System • Built with ❤️</p>
      </div>
    </div>
  );
}

export default Welcome;
