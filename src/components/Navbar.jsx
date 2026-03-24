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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const q = searchParams.get('q') ?? '';
    setInputVal(q);
    setSearchQuery(q);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = inputVal.trim();
    if (query) { setSearchParams({ q: query }); } else { setSearchParams({}); }
    setSearchQuery(query);
    const matched = CITY_PLACE_IDS[query.toLowerCase()];
    if (matched) { setPlaceId(matched); } else if (!query) { setPlaceId(DEFAULT_PLACE_ID); }
    navigate(`/?q=${encodeURIComponent(query)}`);
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-nav' : 'bg-white/95 backdrop-blur-md'} border-b border-teal-100`}>
      <div className="max-w-7xl mx-auto h-16 flex items-center gap-4 px-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 whitespace-nowrap shrink-0 group">
          <div className="w-8 h-8 gradient-hero rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-md">
            S
          </div>
          <span className="font-display font-bold text-lg text-teal-900 group-hover:text-teal-600 transition-colors">
            SmartStay
          </span>
        </Link>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="flex flex-1 max-w-lg items-center bg-cream-100 border border-teal-100 rounded-full overflow-hidden focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-100 transition-all shadow-sm"
        >
          <span className="pl-4 text-teal-400">🔍</span>
          <input
            type="text"
            placeholder="Search city — Paris, Tokyo, Dubai…"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 px-3 py-2.5 text-sm outline-none bg-transparent text-teal-900 placeholder-teal-300"
          />
          <button
            type="submit"
            className="m-1 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors"
          >
            Search
          </button>
        </form>

        {/* Nav */}
        <div className="flex items-center gap-3 ml-auto">
          <Link to="/favorites" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-teal-700 hover:text-teal-500 transition-colors px-3 py-1.5 rounded-full hover:bg-teal-50">
            <span>♡</span> Saved
          </Link>
          <Link to="/bookings" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-teal-700 hover:text-teal-500 transition-colors px-3 py-1.5 rounded-full hover:bg-teal-50">
            <span>📋</span> Bookings
          </Link>
          {user ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full gradient-hero flex items-center justify-center text-white text-sm font-bold">
                {user.name[0].toUpperCase()}
              </div>
              <span className="text-sm font-medium text-teal-800 hidden md:block">{user.name}</span>
              <button
                onClick={() => setUser(null)}
                className="text-xs border border-teal-200 text-teal-600 rounded-full px-3 py-1.5 hover:bg-teal-50 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="gradient-hero text-white text-sm font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-opacity shadow-md"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}