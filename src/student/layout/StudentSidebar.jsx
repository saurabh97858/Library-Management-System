import { useState } from 'react';
import { FiMenu, FiX, FiHome, FiSearch, FiBook, FiUser, FiLogOut } from 'react-icons/fi';

const StudentSidebar = ({ activeMenu, setActiveMenu, isOpen, setIsOpen, onLogout }) => {
    const menuItems = [
        { icon: <FiHome className="text-base" />, label: 'Dashboard', id: 'dashboard' },
        { icon: <FiSearch className="text-base" />, label: 'Search Books', id: 'search' },
        { icon: <FiBook className="text-base" />, label: 'My Issued Books', id: 'issued' },
        { icon: <FiUser className="text-base" />, label: 'Profile', id: 'profile' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 border-r border-gray-700 transition-transform duration-300 z-50 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    } w-52`}
            >
                {/* Logo */}
                <div className="px-3 py-3 border-b border-gray-700 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <FiBook className="text-white text-xs" />
                        </div>
                        <h1 className="text-sm font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            Student Panel
                        </h1>
                    </div>
                    <button
                        className="lg:hidden text-gray-400 hover:text-white"
                        onClick={() => setIsOpen(false)}
                    >
                        <FiX className="text-lg" />
                    </button>
                </div>

                {/* Menu */}
                <nav className="p-2 space-y-1 flex-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveMenu(item.id);
                                setIsOpen(false);
                            }}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-xs ${activeMenu === item.id
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md shadow-blue-500/30'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                }`}
                        >
                            {item.icon}
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>

                {/* Logout - Bottom */}
                <div className="p-2 border-t border-gray-700">
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:bg-red-900/20 hover:text-red-400 transition-all duration-200 text-xs"
                    >
                        <FiLogOut className="text-base" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default StudentSidebar;
