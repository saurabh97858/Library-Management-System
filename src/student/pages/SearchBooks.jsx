import { useState } from 'react';
import { FiSearch, FiBookOpen } from 'react-icons/fi';

const SearchBooks = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const books = [];

    const filteredBooks = books.filter(book =>
        book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-3">
            {/* Search Header */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-3">
                <h1 className="text-sm font-bold text-white mb-2">Search Books</h1>
                <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                        type="text"
                        placeholder="Search by book name or author..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                    />
                </div>
            </div>

            {/* Empty State */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <div className="text-center">
                    <div className="w-12 h-12 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-2">
                        <FiBookOpen className="text-xl text-gray-500" />
                    </div>
                    <h2 className="text-sm font-bold text-white mb-1">No Books Available</h2>
                    <p className="text-gray-400 text-xs mb-2">
                        The library catalog is currently empty. Please check back later!
                    </p>
                    <p className="text-[11px] text-gray-500">
                        Contact the librarian to add books to the collection
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SearchBooks;
