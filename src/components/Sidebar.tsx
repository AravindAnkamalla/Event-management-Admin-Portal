import React from 'react';

interface SidebarProps {
  onNavigate: (page: string) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate, isSidebarOpen, toggleSidebar }) => {
  return (
    <>
      {/* Sidebar Toggle Button for all screens */}
      {/* <button
        className="fixed top-4 left-4 z-40 p-2 rounded-md bg-gray-800 text-white"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button> */}

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        ></div>
      )}

      <aside
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white w-64 p-6 shadow-xl z-30 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <h2 className="text-3xl font-extrabold mb-8 text-blue-400">Admin Panel</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => { onNavigate('dashboard'); toggleSidebar(); }}
                className="flex items-center w-full text-left p-3 rounded-lg hover:bg-gray-700 transition duration-200 text-lg font-medium"
              >
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => { onNavigate('events'); toggleSidebar(); }}
                className="flex items-center w-full text-left p-3 rounded-lg hover:bg-gray-700 transition duration-200 text-lg font-medium"
              >
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                </svg>
                Events
              </button>
            </li>
            <li>
              <button
                onClick={() => { onNavigate('users'); toggleSidebar(); }}
                className="flex items-center w-full text-left p-3 rounded-lg hover:bg-gray-700 transition duration-200 text-lg font-medium"
              >
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                </svg>
                Users
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
