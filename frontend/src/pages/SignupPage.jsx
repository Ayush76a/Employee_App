import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Import the centralized Axios instance

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users/register', {
        name,
        email,
        password,
      });
      alert('Signup successful! Please login.');
      navigate('/login');
    } catch (error) {
      console.error('Error during signup:', error);
      alert('Error signing up');
    }
  };

  return (
    <form className="max-w-md mx-auto my-8 p-4 border rounded" onSubmit={handleSignup}>
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <div className="mb-4">
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
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
      <button className="bg-green-500 text-white px-4 py-2 rounded">Sign Up</button>
    </form>
  );
};

export default SignupPage;
