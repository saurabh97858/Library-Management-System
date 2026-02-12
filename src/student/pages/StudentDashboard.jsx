import { FiBook, FiClock, FiAlertCircle, FiCheck, FiBookOpen } from 'react-icons/fi';

const StudentDashboard = ({ studentData }) => {
    const stats = [
        {
            icon: <FiBook className="text-lg" />,
            title: 'Total Issued Books',
            value: '0',
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-500/10',
            borderColor: 'border-blue-500/50'
        },
        {
            icon: <FiClock className="text-lg" />,
            title: 'Due Soon',
            value: '0',
            color: 'from-yellow-500 to-orange-600',
            bgColor: 'bg-yellow-500/10',
            borderColor: 'border-yellow-500/50'
        },
        {
            icon: <FiAlertCircle className="text-lg" />,
            title: 'Pending Fine',
            value: '₹0',
            color: 'from-red-500 to-pink-600',
            bgColor: 'bg-red-500/10',
            borderColor: 'border-red-500/50'
        },
        {
            icon: <FiCheck className="text-lg" />,
            title: 'Total Books Read',
            value: '0',
            color: 'from-green-500 to-emerald-600',
            bgColor: 'bg-green-500/10',
            borderColor: 'border-green-500/50'
        }
    ];

    return (
        <div className="space-y-3">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 text-white">
                <h1 className="text-lg font-bold mb-0.5">Welcome, {studentData?.name || 'Student'}! 👋</h1>
                <p className="text-blue-100 text-xs">Explore books and manage your reading journey</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className={`${stat.bgColor} border ${stat.borderColor} rounded-xl p-3 hover:scale-105 transition-transform duration-300 cursor-pointer`}
                    >
                        <div className={`bg-gradient-to-br ${stat.color} w-8 h-8 rounded-lg flex items-center justify-center text-white mb-2 shadow-md`}>
                            {stat.icon}
                        </div>
                        <p className="text-gray-400 text-[11px] mb-0.5">{stat.title}</p>
                        <p className="text-xl font-bold text-white">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Empty State for Recent Activity */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <div className="text-center">
                    <div className="w-12 h-12 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-2">
                        <FiBookOpen className="text-xl text-gray-500" />
                    </div>
                    <h2 className="text-sm font-bold text-white mb-1">No Activity Yet</h2>
                    <p className="text-gray-400 text-xs mb-3">
                        Start by searching for books and issuing your first book!
                    </p>
                    <button className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium text-xs shadow-md shadow-blue-500/30 transition-all duration-200">
                        Search Books
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
