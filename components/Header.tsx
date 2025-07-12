'use client'

import { useState } from 'react';
import { Search, Bell, ChevronDown, User } from 'lucide-react';

const Header = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <header className="w-full bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-10">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Teacher Management
      </h2>
      <div className="flex gap-3 items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="border px-10 py-2 rounded-lg text-sm transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent w-40 md:w-64"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>
        
        <button className="relative p-1.5 rounded-full hover:bg-gray-100 transition-colors">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white">
            <User className="w-4 h-4" />
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>
      </div>
    </header>
  );
};

export default Header;