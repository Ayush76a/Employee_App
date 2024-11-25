import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutUser } from '../utils/auth'; // Ensure you have these helpers
import logo from '../assets/images/logo.png'; // Ensure your logo file is present

const Navbar = () => {
  const navigate = useNavigate();
  const user = getCurrentUser(); // Fetch the logged-in user

  const handleLogout = () => {
    logoutUser(); // Remove user data and navigate to login
    navigate('/');
  };

  return (
    <nav className="bg-blue-500 p-6 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-12 mr-6" />
          <h1 className="text-3xl font-bold">Employee Management App</h1>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-10 text-xl font-semibold">
         
          {!user ? (
            <>
              <Link to="/" className="hover:underline">Home</Link> {/* Home link */}
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/signup" className="hover:underline">Register</Link>
            </>
          ) : (
            <>
              {/* Dynamic Dashboard Link */}
              <Link to="/dashboard" className="hover:underline">
                Dashboard {user.name && `- ${user.name}`}
              </Link>
              <Link to="/employees" className="hover:underline">Employees</Link>
              <Link to="/create" className="hover:underline">Add Employee</Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
