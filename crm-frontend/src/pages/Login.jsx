import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePage } from '../context/PageContext';
import Button from '../components/Button';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { setCurrentPage } = usePage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(username, password);
    if (result.success) {
      setCurrentPage('dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-500 hover:scale-105">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center font-inter">
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-gray-700 text-sm font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <Button type="submit" primary fullWidth>
            Login
          </Button>
        </form>
        <p className="text-center text-gray-500 text-sm mt-6">
          Don't have an account?{' '}
          <button onClick={() => setCurrentPage('signup')} className="text-blue-600 hover:underline font-medium">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;