// src/components/BookingCard.jsx
import { useBookingStore } from '../store/useBookingStore';

export default function BookingCard({ booking }) {
  const { cancelBooking } = useBookingStore();

  return (
    <div className={`bg-white border border-gray-200 rounded-xl p-4 flex gap-4 items-center hover:shadow transition-shadow ${booking.status === 'cancelled' ? 'opacity-50' : ''}`}>
      {booking.listingImage && (
        <img
          src={booking.listingImage}
          alt={booking.listingName}
          className="w-24 h-16 rounded-lg object-cover shrink-0"
        />
      )}
      <div className="flex-1">
        <h3 className="font-semibold text-base mb-1">{booking.listingName}</h3>
        <p className="text-sm text-gray-500">📅 {booking.checkin} → {booking.checkout}</p>
        <p className="text-sm text-gray-500">👥 {booking.guests} guest{booking.guests !== 1 ? 's' : ''}</p>
        <p className="text-sm text-gray-500">💰 Total: ${booking.totalPrice}</p>
        <span className={`inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-semibold ${
          booking.status === 'confirmed'
            ? 'bg-emerald-100 text-emerald-700'
            : booking.status === 'cancelled'
            ? 'bg-red-100 text-red-600'
            : 'bg-yellow-100 text-yellow-700'
        }`}>
          {booking.status}
        </span>
      </div>
      {booking.status !== 'cancelled' && (
        <button
          onClick={() => cancelBooking(booking.id)}
          className="shrink-0 border border-gray-200 text-sm px-4 py-2 rounded-lg hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-colors cursor-pointer"
        >
          Cancel
        </button>
      )}
    </div>
  );
}