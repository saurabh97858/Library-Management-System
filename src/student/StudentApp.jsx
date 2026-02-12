import { useState } from 'react';
import StudentSidebar from './layout/StudentSidebar';
import StudentNavbar from './layout/StudentNavbar';
import StudentDashboard from './pages/StudentDashboard';
import SearchBooks from './pages/SearchBooks';
import MyIssuedBooks from './pages/MyIssuedBooks';
import StudentProfile from './pages/StudentProfile';

const StudentApp = ({ onLogout, studentData }) => {
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const [isOpen, setIsOpen] = useState(false);
    const [showPasswordBanner, setShowPasswordBanner] = useState(
        studentData && !studentData.passwordChanged
    );

    const renderPage = () => {
        switch (activeMenu) {
            case 'dashboard':
                return <StudentDashboard studentData={studentData} />;
            case 'search':
                return <SearchBooks />;
            case 'issued':
                return <MyIssuedBooks />;
            case 'profile':
                return <StudentProfile studentData={studentData} onPasswordChanged={() => setShowPasswordBanner(false)} />;
            default:
                return <StudentDashboard studentData={studentData} />;
        }
    };

    return (
        <div className="dark min-h-screen bg-gray-950">
            <StudentSidebar
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                onLogout={onLogout}
            />
            <StudentNavbar setIsOpen={setIsOpen} onLogout={onLogout} studentData={studentData} />

            <main className="lg:ml-52 pt-11 min-h-screen">
                <div className="p-3">
                    {/* Password Change Notification */}
                    {showPasswordBanner && (
                        <div className="mb-3 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-500/50 rounded-xl p-2.5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-xl">⚠️</span>
                                <div>
                                    <p className="text-yellow-300 font-semibold text-xs">Security Alert!</p>
                                    <p className="text-yellow-200/80 text-[11px]">Your account is using the default password. Please change it.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setActiveMenu('profile')}
                                    className="px-2.5 py-1 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg font-medium transition-all duration-200 text-[11px] whitespace-nowrap"
                                >
                                    Change Password
                                </button>
                                <button
                                    onClick={() => setShowPasswordBanner(false)}
                                    className="px-2 py-1 text-yellow-400 hover:text-yellow-300 text-sm"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    )}
                    {renderPage()}
                </div>
            </main>
        </div>
    );
};

export default StudentApp;
