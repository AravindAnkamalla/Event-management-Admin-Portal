import React from 'react';

interface HeaderProps {
  onLogout: () => void;
  userName: string;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout, userName, toggleSidebar }) => {
  return (
    <header className="h-16 w-full bg-blue-600 text-white flex items-center px-4 shadow z-20">
      {/* Sidebar Toggle Button (always visible) */}
      <button
        className="mr-4 p-2 rounded-md bg-blue-700 hover:bg-blue-800 focus:outline-none"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>

      {/* App Title */}
      <h1 className="text-xl font-bold flex-1">Admin Dashboard</h1>

      {/* User Info and Logout */}
      <div className="flex items-center space-x-4">
        <span className="hidden sm:inline">Welcome, {userName}</span>
        <button
          onClick={onLogout}
          className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded transition duration-200"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
