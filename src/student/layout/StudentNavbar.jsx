import { FiMenu, FiUser } from 'react-icons/fi';

const StudentNavbar = ({ setIsOpen, onLogout, studentData }) => {
    const getInitials = () => {
        if (!studentData?.name) return '?';
        const names = studentData.name.split(' ');
        return names.length >= 2
            ? (names[0][0] + names[names.length - 1][0]).toUpperCase()
            : names[0][0].toUpperCase();
    };

    return (
        <nav className="fixed top-0 left-0 lg:left-52 right-0 h-11 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 z-30 px-4 flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button
                className="lg:hidden text-gray-400 hover:text-white"
                onClick={() => setIsOpen(true)}
            >
                <FiMenu className="text-lg" />
            </button>

            {/* Page Title */}
            <h2 className="text-sm font-semibold text-white hidden lg:block">
                Student Dashboard
            </h2>

            <div className="flex-1 lg:hidden"></div>

            {/* Right Side - Student Info */}
            <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-2 px-2 py-1 bg-gray-800/50 rounded-lg border border-gray-700">
                    <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">{getInitials()}</span>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-white leading-tight">{studentData?.name || 'Student'}</p>
                        <p className="text-[10px] text-gray-400 leading-tight">{studentData?.course || ''}</p>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default StudentNavbar;
