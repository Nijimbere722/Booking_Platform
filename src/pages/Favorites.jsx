// src/pages/Favorites.jsx
import { useAppContext } from '../context/AppContext';
import { useListings } from '../hooks/useListings';
import ListingCard from '../components/ListingCard';
import Loader from '../components/Loader';
import ErrorState from '../components/ErrorState';

export default function Favorites() {
  const { favorites, placeId } = useAppContext();
  const { data: listings, isLoading, isError, error } = useListings({ placeId });
  const favListings = (listings ?? []).filter((l) => favorites.includes(l.id));

  return (
    <div className="py-8 pb-12">
      <h1 className="text-2xl font-bold mb-2">Saved Listings</h1>
      <p className="text-sm text-gray-500 mb-6">
        {favListings.length} saved listing{favListings.length !== 1 ? 's' : ''}
      </p>

      {isLoading && <Loader />}
      {isError && <ErrorState message={error?.message} />}

      {!isLoading && !isError && favListings.length === 0 && (
        <div className="flex flex-col items-center py-20 text-gray-400 gap-3">
          <span className="text-5xl">♡</span>
          <p className="text-sm">No saved listings yet. Click ♡ on any property to save it!</p>
        </div>
      )}

      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
        {favListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} placeId={placeId} />
        ))}
      </div>
    </div>
  );
}