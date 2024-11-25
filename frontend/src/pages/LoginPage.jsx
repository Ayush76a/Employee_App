import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Import the centralized Axios instance

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use the centralized Axios instance
      const { data } = await api.post('/users/login', { email, password });
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/dashboard'); // Navigate to the dashboard on success
      alert('Login successful');
    } catch (error) {
      alert(error.response?.data?.message || 'Error logging in');
    }
  };

  return (
    <form className="max-w-md mx-auto my-8 p-4 border rounded" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <div className="mb-4">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
    </form>
  );
};

export default LoginPage;
