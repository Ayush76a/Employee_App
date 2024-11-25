import React from 'react';

const DashboardPage = () => {
  const user = JSON.parse(localStorage.getItem('user')); // Get user details from localStorage

  return (
    <div className="container mx-auto my-8 text-center">
      <h1 className="text-3xl font-bold mb-4">
        Welcome, {user ? user.name : 'User'} {/* Greet the user */}
      </h1>
      <p className="text-lg">
        Manage your employees. Use the navigation bar to get started.
      </p>
    </div>
  );
};

export default DashboardPage;
