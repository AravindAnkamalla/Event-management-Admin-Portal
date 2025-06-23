import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ResetPasswordPage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);
    const success = await resetPassword(email);
    setLoading(false);
    if (success) {
      setMessage('If an account with that email exists, a password reset link has been sent.');
    } else {
      setError('Failed to send reset link. Please check the email.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-200">
        <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-8">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {message && <p className="text-green-600 text-sm text-center">{message}</p>}
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-lg text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <button
            onClick={() => onNavigate('login')}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition duration-200"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
