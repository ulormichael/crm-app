import React from 'react';
import { useAuth } from '../context/AuthContext';
import { usePage } from '../context/PageContext';
import logo from '../assets/images/crm-logo.png'; 

const NavLink = ({ to, children }) => {
  const { currentPage, setCurrentPage } = usePage();
  const isActive = currentPage === to;

  return (
    <button
      onClick={() => setCurrentPage(to)}
      className={`relative text-white font-medium text-lg py-1 px-2 rounded-md transition duration-300 ease-in-out
        ${isActive ? 'bg-blue-700 bg-opacity-70' : 'hover:bg-blue-500 hover:bg-opacity-50'}`}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 origin-left animate-underline"></span>
      )}
    </button>
  );
};

const Navbar = () => {
  const { user, logout } = useAuth();
  const { currentPage } = usePage();

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <img src={logo} alt="CRM Logo" className="h-14 w-14 rounded-full" />
        {/* <div className="text-white text-2xl font-bold font-inter">CRM App</div> */}
      </div>
        <div className="flex space-x-6">
          <NavLink to="home">Home</NavLink>
          {user ? (
            <>
              <NavLink to="dashboard">Dashboard</NavLink>
              <button
                onClick={logout}
                className="text-white hover:text-blue-200 transition duration-300 ease-in-out font-medium"
              >
                Logout ({user.username})
              </button>
            </>
          ) : (
            <NavLink to="login">Login</NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;