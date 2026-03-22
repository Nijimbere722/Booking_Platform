// src/components/BookingForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../store/useBookingStore';
import { useCreateBooking } from '../hooks/useListings';

export default function BookingForm({ listing }) {
  const { user, addBooking } = useBookingStore();
  const navigate = useNavigate();
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [guests, setGuests] = useState(1);

  const { mutate: submitBooking, isPending, isSuccess, isError, error } = useCreateBooking();

  const nights =
    checkin && checkout
      ? Math.max(0, Math.round((new Date(checkout) - new Date(checkin)) / 86400000))
      : 0;
  const total = nights * listing.price.rate;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }
    if (nights < 1) return;
    submitBooking(
      {
        listingId: listing.id,
        listingName: listing.name,
        listingImage: listing.images?.[0]?.url ?? '',
        checkin, checkout, guests,
        totalPrice: total,
        createdAt: new Date().toISOString(),
      },
      {
        onSuccess: (confirmedBooking) => {
          addBooking(confirmedBooking);
        },
      }
    );
  };

  if (isSuccess) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-8 text-center flex flex-col items-center gap-3 shadow">
        <span className="text-5xl">✅</span>
        <h3 className="text-lg font-bold">Booking Confirmed!</h3>
        <p className="text-sm text-gray-500">
          Your stay has been booked for {nights} night{nights !== 1 ? 's' : ''}.
        </p>
        <button
          onClick={() => navigate('/bookings')}
          className="mt-2 bg-rose-500 text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-rose-600 transition-colors cursor-pointer"
        >
          View Bookings
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 shadow">
      <div className="text-2xl font-bold mb-4">
        ${listing.price.rate}
        <span className="text-base font-normal text-gray-500"> / night</span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">Check-in</label>
          <input
            type="date" value={checkin} required
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setCheckin(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-rose-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">Check-out</label>
          <input
            type="date" value={checkout} required
            min={checkin || new Date().toISOString().split('T')[0]}
            onChange={(e) => setCheckout(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-rose-500 transition-colors"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">Guests</label>
        <select
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-rose-500 transition-colors"
        >
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>{n} guest{n > 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>

      {nights > 0 && (
        <div className="border-t border-gray-100 pt-3 mb-4 space-y-2">
          <div className="flex justify-between text-sm text-gray-500">
            <span>${listing.price.rate} × {nights} nights</span>
            <span>${total}</span>
          </div>
          <div className="flex justify-between text-sm font-bold border-t border-gray-100 pt-2">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>
      )}

      {isError && (
        <p className="text-xs text-red-500 mb-3">{error?.message ?? 'Booking failed. Try again.'}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-rose-500 text-white font-semibold py-3 rounded-lg hover:bg-rose-600 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPending ? 'Booking…' : user ? 'Reserve' : 'Login to Reserve'}
      </button>
    </form>
  );
}