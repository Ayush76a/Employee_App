import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/images/Home_Background.png'; // Update the path as necessary

const Home = () => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover', // Ensure the image covers the full screen
        backgroundAttachment: 'fixed', // Keeps the background fixed during scrolling
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-blue-600 bg-opacity-30"></div>

      {/* Content */}
      <div className="relative flex items-center justify-start h-full text-left ml-16">
        {/* White Container */}
        <div className="bg-white bg-opacity-90 rounded-lg p-8 shadow-md w-[90%] max-w-lg mt-28">
          <h1 className="text-4xl font-extrabold mb-6 text-blue-600">
            Welcome 👋 
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Manage employees and their data with ease. Login or sign up to get started.
          </p>
          <div className="flex space-x-6">
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded shadow"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded shadow"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
