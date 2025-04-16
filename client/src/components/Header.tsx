import React, { useState } from 'react';

interface HeaderProps {
  onMenuToggle: () => void;
  onSearch: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <header className="bg-dark-light border-b border-dark-lighter sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            id="menu-toggle" 
            className="lg:hidden text-gray-400 hover:text-white"
            onClick={onMenuToggle}
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
          <h1 className="font-bold text-xl md:text-2xl tracking-tight text-white">SERVER STATUS</h1>
          <span className="hidden md:inline-flex items-center bg-dark-lighter px-2 py-1 rounded text-xs font-mono">v0.3.0</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input 
              type="text" 
              id="search" 
              placeholder="Search services..." 
              className="bg-dark-lighter border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary w-48 md:w-64"
              value={searchTerm}
              onChange={handleSearch}
            />
            <i className="fas fa-search absolute left-3 top-2.5 text-gray-500"></i>
          </div>
          <a href="#" className="hidden md:block text-gray-400 hover:text-white">
            <i className="fas fa-bell"></i>
          </a>
          <a href="#" className="hidden md:block text-gray-400 hover:text-white">
            <i className="fas fa-cog"></i>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
