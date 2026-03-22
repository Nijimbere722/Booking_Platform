// src/pages/Home.jsx
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useListings } from '../hooks/useListings';
import { useAppContext } from '../context/AppContext';
import ListingCard from '../components/ListingCard';
import Loader from '../components/Loader';
import ErrorState from '../components/ErrorState';
import Sidebar from '../components/Sidebar';

export default function Home() {
  const [searchParams] = useSearchParams();
  const { filters, placeId, setSearchQuery, searchQuery } = useAppContext();

  useEffect(() => {
    const q = searchParams.get('q') ?? '';
    setSearchQuery(q);
  }, [searchParams]);

  const { data: listings, isLoading, isError, error, refetch } = useListings({
    placeId,
    checkin: filters.checkin || undefined,
    checkout: filters.checkout || undefined,
    priceMax: filters.priceMax < 1000 ? filters.priceMax : undefined,
    priceMin: filters.priceMin > 0 ? filters.priceMin : undefined,
    rating: filters.rating,
  });

  const filtered = (listings ?? []).filter((l) => {
    const matchesLocation =
      !filters.location ||
      l.city.toLowerCase().includes(filters.location.toLowerCase()) ||
      l.country.toLowerCase().includes(filters.location.toLowerCase());
    const matchesSearch =
      !searchQuery ||
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLocation && matchesSearch;
  });

  return (
    <div className="flex gap-7 pt-7">
      <Sidebar />
      <main className="flex-1 min-w-0">
        <div className="flex items-baseline gap-3 mb-5 flex-wrap">
          <h1 className="text-2xl font-bold">
            {searchQuery ? `Results for "${searchQuery}"` : 'Stays in Paris'}
          </h1>
          {!isLoading && (
            <p className="text-sm text-gray-500">
              {filtered.length} place{filtered.length !== 1 ? 's' : ''} found
            </p>
          )}
        </div>

        {isLoading && <Loader />}
        {isError && <ErrorState message={error?.message ?? 'Failed to load listings.'} onRetry={refetch} />}
        {!isLoading && !isError && filtered.length === 0 && (
          <div className="flex flex-col items-center py-20 text-gray-400 gap-3">
            <span className="text-5xl">🔍</span>
            <p className="text-sm">No listings match your filters. Try adjusting them.</p>
          </div>
        )}

        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6 pb-12">
          {filtered.map((listing) => (
            <ListingCard key={listing.id} listing={listing} placeId={placeId} />
          ))}
        </div>
      </main>
    </div>
  );
}