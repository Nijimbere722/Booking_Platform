// src/components/Navbar.jsx
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useBookingStore } from '../store/useBookingStore';
import { useAppContext, CITY_PLACE_IDS, DEFAULT_PLACE_ID } from '../context/AppContext';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { user, setUser } = useBookingStore();
  const { searchQuery, setSearchQuery, setPlaceId } = useAppContext();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputVal, setInputVal] = useState(searchQuery);

  useEffect(() => {
    const q = searchParams.get('q') ?? '';
    setInputVal(q);
    setSearchQuery(q);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = inputVal.trim();
    if (query) {
      setSearchParams({ q: query });
    } else {
      setSearchParams({});
    }
    setSearchQuery(query);
    const matched = CITY_PLACE_IDS[query.toLowerCase()];
    if (matched) {
      setPlaceId(matched);
    } else if (!query) {
      setPlaceId(DEFAULT_PLACE_ID);
    }
    navigate(`/?q=${encodeURIComponent(query)}`);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto h-16 flex items-center gap-6 px-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-rose-500 whitespace-nowrap shrink-0">
          🏠 <span>SmartStay</span>
        </Link>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="flex flex-1 max-w-md items-center border border-gray-300 rounded-full overflow-hidden focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-100 transition-all"
        >
          <input
            type="text"
            placeholder="Search city (Paris, London…)"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 px-5 py-2 text-sm outline-none bg-transparent"
          />
          <button
            type="submit"
            className="bg-rose-500 px-4 py-2 text-white text-sm hover:bg-rose-600 transition-colors cursor-pointer"
          >
            🔍
          </button>
        </form>

        {/* Nav links + Auth */}
        <div className="flex items-center gap-4 ml-auto">
          <Link
            to="/favorites"
            className="text-sm font-medium text-gray-700 hover:text-rose-500 transition-colors hidden sm:block"
          >
            ♡ Saved
          </Link>
          <Link
            to="/bookings"
            className="text-sm font-medium text-gray-700 hover:text-rose-500 transition-colors hidden sm:block"
          >
            📋 Bookings
          </Link>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium hidden md:block">{user.name}</span>
              <button
                onClick={() => setUser(null)}
                className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-rose-500 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-rose-600 transition-colors"
            >
              Login
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
}