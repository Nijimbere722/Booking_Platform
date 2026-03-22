// src/pages/Bookings.jsx
import { Navigate } from 'react-router-dom';
import { useBookingStore } from '../store/useBookingStore';
import UserProfileCard from '../components/UserProfileCard';
import BookingCard from '../components/BookingCard';

export default function Bookings() {
  const { user, bookings } = useBookingStore();
  if (!user) return <Navigate to="/login" replace />;

  const active = bookings.filter((b) => b.status !== 'cancelled');
  const cancelled = bookings.filter((b) => b.status === 'cancelled');

  return (
    <div className="py-8 pb-12">
      <UserProfileCard />
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

      {bookings.length === 0 && (
        <div className="flex flex-col items-center py-20 text-gray-400 gap-2">
          <span className="text-4xl">📋</span>
          <p>No bookings yet. Start exploring!</p>
        </div>
      )}

      {active.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">Upcoming & Active</h2>
          <div className="flex flex-col gap-4">
            {active.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </section>
      )}

      {cancelled.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">Cancelled</h2>
          <div className="flex flex-col gap-3">
            {cancelled.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}