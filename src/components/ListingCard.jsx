// src/components/ui/ListingCard.jsx
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function ListingCard({ listing, placeId }) {
  const { toggleFavorite, isFavorite } = useAppContext();
  const fav = isFavorite(listing.id);
  const img = listing.images?.[0]?.url ?? 'https://placehold.co/400x280?text=No+Image';

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
      <div className="relative h-48 overflow-hidden">
        <img
          src={img}
          alt={listing.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <button
          onClick={() => toggleFavorite(listing.id)}
          aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center text-lg backdrop-blur-sm transition-colors cursor-pointer ${
            fav ? 'bg-white text-rose-500' : 'bg-white/80 text-gray-700 hover:bg-white'
          }`}
        >
          {fav ? '♥' : '♡'}
        </button>
        {listing.isSuperhost && (
          <span className="absolute bottom-2.5 left-2.5 bg-white text-xs font-bold px-2 py-0.5 rounded">
            Superhost
          </span>
        )}
      </div>

      <Link to={`/listing/${listing.id}?placeId=${placeId}`} className="block p-4">
        <div className="flex justify-between items-start gap-2 mb-1">
          <h3 className="text-sm font-semibold line-clamp-2 text-gray-900">{listing.name}</h3>
          <span className="text-sm text-gray-800 whitespace-nowrap">
            ★ {listing.rating > 0 ? listing.rating.toFixed(1) : 'New'}
          </span>
        </div>
        <p className="text-xs text-gray-500 mb-0.5">{listing.city || listing.type}</p>
        <p className="text-xs text-gray-400 mb-2">
          {listing.beds} bed{listing.beds !== 1 ? 's' : ''} · {listing.bathrooms} bath
        </p>
        <p className="text-sm text-gray-900">
          <strong className="font-bold">${listing.price.rate}</strong>
          <span className="text-gray-500"> / night</span>
        </p>
      </Link>
    </div>
  );
}