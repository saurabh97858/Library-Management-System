import { useState } from 'react';
import { FiUser, FiMail, FiBook, FiHash, FiPhone, FiMapPin, FiLock, FiCheck, FiAlertCircle } from 'react-icons/fi';

const StudentProfile = ({ studentData, onPasswordChanged }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMsg, setPasswordMsg] = useState(null);

    const getInitials = () => {
        if (!studentData?.name) return '?';
        const names = studentData.name.split(' ');
        return names.length >= 2
            ? (names[0][0] + names[names.length - 1][0]).toUpperCase()
            : names[0][0].toUpperCase();
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        setPasswordMsg(null);

        if (currentPassword !== studentData.password) {
            setPasswordMsg({ type: 'error', text: 'Current password is incorrect!' });
            return;
        }
        if (newPassword !== confirmPassword) {
            setPasswordMsg({ type: 'error', text: 'New passwords do not match!' });
            return;
        }
        if (newPassword.length < 4) {
            setPasswordMsg({ type: 'error', text: 'New password must be at least 4 characters!' });
            return;
        }
        if (newPassword === currentPassword) {
            setPasswordMsg({ type: 'error', text: 'New password cannot be same as current password!' });
            return;
        }

        const savedStudents = JSON.parse(localStorage.getItem('lms_students') || '[]');
        const updatedStudents = savedStudents.map(s => {
            if (s.rollNumber === studentData.rollNumber) {
                return { ...s, password: newPassword, passwordChanged: true };
            }
            return s;
        });
        localStorage.setItem('lms_students', JSON.stringify(updatedStudents));

        studentData.password = newPassword;
        studentData.passwordChanged = true;

        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setPasswordMsg({ type: 'success', text: 'Password changed successfully! ✅' });

        if (onPasswordChanged) onPasswordChanged();
    };

    return (
        <div className="space-y-3">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4">
                <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border-2 border-white/50">
                        <span className="text-white font-bold text-xl uppercase">
                            {getInitials()}
                        </span>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-white mb-0.5">
                            {studentData?.name || 'Student'}
                        </h1>
                        <p className="text-blue-100 text-xs">{studentData?.course || ''}</p>
                        <p className="text-blue-200/60 text-[10px] mt-0.5">Roll No: {studentData?.rollNumber || 'N/A'}</p>
                    </div>
                </div>
            </div>

            {/* Profile Info - Read Only */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Personal Information */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-3">
                    <h2 className="text-sm font-bold text-white mb-2">Personal Information</h2>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2.5 p-2 bg-gray-900/50 rounded-lg">
                            <div className="w-8 h-8 bg-blue-600/20 rounded-md flex items-center justify-center">
                                <FiUser className="text-blue-400 text-sm" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-[10px]">Full Name</p>
                                <p className="text-white font-medium text-xs">{studentData?.name || 'Not set'}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2.5 p-2 bg-gray-900/50 rounded-lg">
                            <div className="w-8 h-8 bg-purple-600/20 rounded-md flex items-center justify-center">
                                <FiMail className="text-purple-400 text-sm" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-[10px]">Email</p>
                                <p className="text-white font-medium text-xs">{studentData?.email || 'Not set'}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2.5 p-2 bg-gray-900/50 rounded-lg">
                            <div className="w-8 h-8 bg-green-600/20 rounded-md flex items-center justify-center">
                                <FiPhone className="text-green-400 text-sm" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-[10px]">Phone</p>
                                <p className="text-white font-medium text-xs">{studentData?.phone || 'Not set'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Academic Information */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-3">
                    <h2 className="text-sm font-bold text-white mb-2">Academic Information</h2>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2.5 p-2 bg-gray-900/50 rounded-lg">
                            <div className="w-8 h-8 bg-yellow-600/20 rounded-md flex items-center justify-center">
                                <FiHash className="text-yellow-400 text-sm" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-[10px]">Roll Number</p>
                                <p className="text-white font-medium text-xs">{studentData?.rollNumber || 'Not set'}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2.5 p-2 bg-gray-900/50 rounded-lg">
                            <div className="w-8 h-8 bg-pink-600/20 rounded-md flex items-center justify-center">
                                <FiBook className="text-pink-400 text-sm" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-[10px]">Course</p>
                                <p className="text-white font-medium text-xs">{studentData?.course || 'Not set'}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2.5 p-2 bg-gray-900/50 rounded-lg">
                            <div className="w-8 h-8 bg-cyan-600/20 rounded-md flex items-center justify-center">
                                <FiBook className="text-cyan-400 text-sm" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-[10px]">Enrollment</p>
                                <p className="text-white font-medium text-xs">{studentData?.enrollment || 'Not set'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Change Password Section */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-red-600/20 rounded-md flex items-center justify-center">
                        <FiLock className="text-red-400 text-sm" />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-white">Change Password</h2>
                        <p className="text-gray-400 text-[10px]">
                            {studentData?.passwordChanged
                                ? 'Your password has been changed.'
                                : 'You are using the default password. Please change it.'}
                        </p>
                    </div>
                    {!studentData?.passwordChanged && (
                        <span className="ml-auto px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-[10px] rounded-full border border-yellow-500/50 animate-pulse">
                            Action Needed
                        </span>
                    )}
                </div>

                {/* Password Change Message */}
                {passwordMsg && (
                    <div className={`mb-3 p-2.5 rounded-lg flex items-center gap-2 text-xs ${passwordMsg.type === 'error'
                        ? 'bg-red-900/30 border border-red-500/50 text-red-400'
                        : 'bg-green-900/30 border border-green-500/50 text-green-400'
                        }`}>
                        {passwordMsg.type === 'error'
                            ? <FiAlertCircle className="text-sm flex-shrink-0" />
                            : <FiCheck className="text-sm flex-shrink-0" />
                        }
                        <p className="font-medium">{passwordMsg.text}</p>
                    </div>
                )}

                <form onSubmit={handlePasswordChange} className="space-y-2.5 max-w-sm">
                    <div>
                        <label className="text-gray-400 text-[11px] mb-1 block">Current Password</label>
                        <input
                            type="password"
                            required
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="Enter current password"
                            className="w-full px-3 py-1.5 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                        />
                    </div>
                    <div>
                        <label className="text-gray-400 text-[11px] mb-1 block">New Password</label>
                        <input
                            type="password"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                            className="w-full px-3 py-1.5 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                        />
                    </div>
                    <div>
                        <label className="text-gray-400 text-[11px] mb-1 block">Confirm New Password</label>
                        <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            className="w-full px-3 py-1.5 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-white font-medium text-xs shadow-md shadow-blue-500/30 transition-all duration-200"
                    >
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StudentProfile;
