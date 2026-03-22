// src/components/UserProfileCard.jsx
import { Link } from 'react-router-dom';
import { useBookingStore } from '../store/useBookingStore';

export default function UserProfileCard() {
  const { user, bookings } = useBookingStore();
  const activeCount = bookings.filter((b) => b.status !== 'cancelled').length;

  if (!user) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4 mb-7">
        <p className="text-sm text-gray-500">You are not logged in.</p>
        <Link to="/login" className="bg-rose-500 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-rose-600 transition-colors">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4 mb-7">
      <div className="w-14 h-14 rounded-full bg-rose-500 text-white flex items-center justify-center text-2xl font-bold shrink-0">
        {user.name[0].toUpperCase()}
      </div>
      <div>
        <h3 className="font-bold text-base">{user.name}</h3>
        <p className="text-sm text-gray-500">{user.email}</p>
        <p className="text-sm text-gray-500">{activeCount} active booking{activeCount !== 1 ? 's' : ''}</p>
      </div>
    </div>
  );
}