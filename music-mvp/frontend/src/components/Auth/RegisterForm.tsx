import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);

    try {
      await register(username, password);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-spotify-light-gray p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign up for Music MVP</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 bg-spotify-gray border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
            required
            minLength={3}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-spotify-gray border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
            required
            minLength={6}
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 bg-spotify-gray border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
            required
            minLength={6}
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-spotify-green text-black font-semibold py-2 px-4 rounded-md hover:bg-green-400 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>

      <div className="mt-4 text-center">
        <span className="text-gray-400">Already have an account? </span>
        <button
          onClick={onSwitchToLogin}
          className="text-spotify-green hover:underline"
        >
          Log in
        </button>
      </div>
    </div>
  );
};