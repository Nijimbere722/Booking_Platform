// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../store/useBookingStore';

export default function Login() {
  const { setUser, user } = useBookingStore();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  if (user) { navigate('/'); return null; }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) { setError('Please fill in all fields.'); return; }
    if (!email.includes('@')) { setError('Please enter a valid email.'); return; }
    setUser({ id: `user-${Date.now()}`, name: name.trim(), email: email.trim() });
    navigate('/');
  };

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center px-4 py-12">
      <div className="bg-white border border-gray-200 rounded-2xl p-10 w-full max-w-md shadow-lg">
        <div className="text-rose-500 font-bold text-xl mb-5">🏠 SmartStay</div>
        <h1 className="text-2xl font-bold mb-1">Welcome back</h1>
        <p className="text-sm text-gray-500 mb-6">Sign in to manage your bookings and favorites</p>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">Full Name</label>
            <input
              type="text" value={name} placeholder="John Doe"
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-rose-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">Email</label>
            <input
              type="email" value={email} placeholder="john@example.com"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-rose-500 transition-colors"
            />
          </div>
          <button type="submit" className="w-full bg-rose-500 text-white font-semibold py-3 rounded-lg hover:bg-rose-600 transition-colors cursor-pointer mt-1">
            Sign In
          </button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-4">No password needed — this is a demo login.</p>
      </div>
    </div>
  );
}