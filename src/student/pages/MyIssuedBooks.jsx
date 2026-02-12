import { FiBookOpen } from 'react-icons/fi';

const MyIssuedBooks = () => {
    const issuedBooks = [];
    const totalFine = issuedBooks.reduce((sum, book) => sum + book.fine, 0);

    return (
        <div className="space-y-3">
            {/* Header */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-3">
                <h1 className="text-sm font-bold text-white mb-0.5">My Issued Books</h1>
                <p className="text-gray-400 text-xs">Track your borrowed books and due dates</p>
            </div>

            {/* Empty State */}
            {issuedBooks.length === 0 ? (
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                    <div className="text-center">
                        <div className="w-12 h-12 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-2">
                            <FiBookOpen className="text-xl text-gray-500" />
                        </div>
                        <h2 className="text-sm font-bold text-white mb-1">No Issued Books</h2>
                        <p className="text-gray-400 text-xs mb-3">
                            You haven't borrowed any books yet. Start exploring the library!
                        </p>
                        <button className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium text-xs shadow-md shadow-blue-500/30 transition-all duration-200">
                            Browse Books
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    {/* Books Table */}
                    <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-900/50">
                                    <tr>
                                        <th className="px-3 py-2 text-left text-[11px] font-semibold text-gray-300">Book Name</th>
                                        <th className="px-3 py-2 text-left text-[11px] font-semibold text-gray-300">Issue Date</th>
                                        <th className="px-3 py-2 text-left text-[11px] font-semibold text-gray-300">Due Date</th>
                                        <th className="px-3 py-2 text-left text-[11px] font-semibold text-gray-300">Status</th>
                                        <th className="px-3 py-2 text-left text-[11px] font-semibold text-gray-300">Fine</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700">
                                    {issuedBooks.map((book) => (
                                        <tr
                                            key={book.id}
                                            className={`hover:bg-gray-900/30 transition-colors ${book.overdue ? 'bg-red-900/10' : ''}`}
                                        >
                                            <td className={`px-3 py-2 text-xs font-medium ${book.overdue ? 'text-red-400' : 'text-white'}`}>
                                                {book.name}
                                            </td>
                                            <td className="px-3 py-2 text-xs text-gray-400">{book.issueDate}</td>
                                            <td className={`px-3 py-2 text-xs ${book.overdue ? 'text-red-400 font-medium' : 'text-gray-400'}`}>
                                                {book.dueDate}
                                            </td>
                                            <td className="px-3 py-2">
                                                {book.status === 'Active' && (
                                                    <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-[10px] rounded-full border border-green-500/50">
                                                        Active
                                                    </span>
                                                )}
                                                {book.status === 'Due Soon' && (
                                                    <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-[10px] rounded-full border border-yellow-500/50">
                                                        Due Soon
                                                    </span>
                                                )}
                                                {book.status === 'Overdue' && (
                                                    <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-[10px] rounded-full border border-red-500/50 animate-pulse">
                                                        Overdue
                                                    </span>
                                                )}
                                            </td>
                                            <td className={`px-3 py-2 text-xs font-bold ${book.fine > 0 ? 'text-red-400' : 'text-gray-400'}`}>
                                                {book.fine > 0 ? `₹${book.fine}` : '₹0'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Total Fine */}
                    {totalFine > 0 && (
                        <div className="bg-gradient-to-r from-red-900/30 to-pink-900/30 border border-red-500/50 rounded-xl p-3 flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-xs mb-0.5">Total Pending Fine</p>
                                <p className="text-xl font-bold text-red-400">₹{totalFine}</p>
                            </div>
                            <button className="px-4 py-1.5 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 rounded-lg text-white font-medium text-xs shadow-md shadow-red-500/30 transition-all duration-200">
                                Pay Now
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default MyIssuedBooks;
