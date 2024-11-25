import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import EmployeesPage from './pages/EmployeesPage';
import CreateEmployeePage from './pages/CreateEmployeePage';
import EditEmployeePage from './pages/EditEmployeePage'; // Import EditEmployeePage
import { getCurrentUser } from './utils/auth'; // Helper to get the current user

function App() {
  const user = getCurrentUser(); // Check if the user is logged in

  return (
    <Router>
      <Navbar /> {/* Navbar dynamically adjusts based on login status */}
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <Home />} // Redirect to dashboard if logged in
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <LoginPage />} // Redirect if already logged in
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/dashboard" /> : <SignupPage />} // Redirect if already logged in
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={user ? <DashboardPage /> : <Navigate to="/login" />} // Redirect to login if not logged in
        />
        <Route
          path="/employees"
          element={user ? <EmployeesPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/create"
          element={user ? <CreateEmployeePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit/:id"
          element={user ? <EditEmployeePage /> : <Navigate to="/login" />}
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} />} />
      </Routes>
    </Router>
  );
}

export default App;
