// src/pages/ListingDetails.jsx
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useListingDetail } from '../hooks/useListings';
import BookingForm from '../components/BookingForm';
import Loader from '../components/Loader';
import ErrorState from '../components/ErrorState';
import { useAppContext } from '../context/AppContext';

export default function ListingDetails() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const placeId = searchParams.get('placeId') ?? '';
  const { toggleFavorite, isFavorite } = useAppContext();

  const { data: listing, isLoading, isError, error, refetch } = useListingDetail(id, placeId);

  if (isLoading) return <Loader text="Loading property details…" />;
  if (isError) return <ErrorState message={error?.message} onRetry={refetch} />;
  if (!listing) return null;

  const fav = isFavorite(listing.id);
  const img = listing.images?.[0]?.url ?? 'https://placehold.co/800x400?text=No+Image';

  return (
    <div className="pb-12">
      <Link to="/" className="inline-block mt-5 mb-4 text-sm text-gray-500 hover:text-rose-500 transition-colors">
        ← Back to listings
      </Link>

      <div className="h-80 md:h-96 overflow-hidden rounded-2xl">
        <img src={img} alt={listing.name} className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col lg:flex-row gap-10 pt-7 items-start">
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-4 mb-3">
            <div>
              <h1 className="text-2xl font-bold leading-snug">{listing.name}</h1>
              <p className="text-sm text-gray-500 mt-1">
                📍 {listing.city}{listing.country ? `, ${listing.country}` : ''}
              </p>
            </div>
            <button
              onClick={() => toggleFavorite(listing.id)}
              className={`shrink-0 px-4 py-2 border rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                fav ? 'border-rose-400 text-rose-500 bg-rose-50' : 'border-gray-200 text-gray-700 hover:border-gray-400'
              }`}
            >
              {fav ? '♥ Saved' : '♡ Save'}
            </button>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500 pb-5 border-b border-gray-100 mb-6">
            <span>⭐ {listing.rating > 0 ? listing.rating.toFixed(1) : 'New'}</span>
            <span>· {listing.reviewsCount} reviews</span>
            <span>· {listing.beds} bed{listing.beds !== 1 ? 's' : ''}</span>
            <span>· {listing.bathrooms} bath</span>
            <span>· {listing.type}</span>
            {listing.isSuperhost && (
              <span className="bg-gray-100 text-gray-700 text-xs font-bold px-2 py-0.5 rounded">Superhost</span>
            )}
          </div>

          {listing.description && (
            <div className="mb-6 pb-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold mb-2">About this place</h2>
              <p className="text-gray-500 leading-relaxed text-sm">{listing.description}</p>
            </div>
          )}

          {listing.amenities?.length > 0 && (
            <div className="mb-6 pb-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold mb-3">What this place offers</h2>
              <ul className="grid grid-cols-2 gap-2">
                {listing.amenities.map((a) => (
                  <li key={a} className="text-sm text-gray-500 flex items-center gap-2">
                    <span className="text-green-500">✓</span> {a}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {listing.host && (
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center text-xl font-bold shrink-0">
                {listing.host.name[0]}
              </div>
              <div>
                <p className="font-semibold text-sm">Hosted by {listing.host.name}</p>
                {listing.host.isSuperhost && <p className="text-xs text-gray-500">⭐ Superhost</p>}
              </div>
            </div>
          )}
        </div>

        <div className="w-full lg:w-80 shrink-0 lg:sticky lg:top-20">
          <BookingForm listing={listing} />
        </div>
      </div>
    </div>
  );
}