// src/components/Sidebar.jsx
import { useAppContext, CITY_PLACE_IDS } from '../context/AppContext';

export default function Sidebar() {
  const { filters, setFilters, setPlaceId } = useAppContext();
  const update = (key, val) => setFilters((prev) => ({ ...prev, [key]: val }));

  const handleLocation = (val) => {
    update('location', val);
    const match = CITY_PLACE_IDS[val.toLowerCase().trim()];
    if (match) setPlaceId(match);
  };

  const reset = () => {
    setFilters({ priceMin: 0, priceMax: 1000, rating: 0, location: '', checkin: '', checkout: '' });
  };

  return (
    <aside className="w-64 shrink-0 bg-white border border-teal-100 rounded-2xl p-6 h-fit sticky top-20 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display font-bold text-teal-900 text-lg">Filters</h3>
        <button onClick={reset} className="text-xs text-teal-500 hover:text-teal-700 font-medium transition-colors">
          Reset all
        </button>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-teal-100 to-transparent mb-5" />

      {/* Check-in */}
      <div className="mb-4">
        <label className="block text-xs font-semibold uppercase tracking-widest text-teal-500 mb-2">Check-in</label>
        <input
          type="date"
          value={filters.checkin}
          min={new Date().toISOString().split('T')[0]}
          onChange={(e) => update('checkin', e.target.value)}
          className="w-full px-3 py-2.5 bg-cream-100 border border-teal-100 rounded-xl text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50 transition-all text-teal-800"
        />
      </div>

      {/* Check-out */}
      <div className="mb-5">
        <label className="block text-xs font-semibold uppercase tracking-widest text-teal-500 mb-2">Check-out</label>
        <input
          type="date"
          value={filters.checkout}
          min={filters.checkin || new Date().toISOString().split('T')[0]}
          onChange={(e) => update('checkout', e.target.value)}
          className="w-full px-3 py-2.5 bg-cream-100 border border-teal-100 rounded-xl text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50 transition-all text-teal-800"
        />
      </div>

      <div className="h-px bg-gradient-to-r from-teal-100 to-transparent mb-5" />

      {/* Price */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-teal-500">Max Price</label>
          <span className="text-sm font-bold text-teal-700">${filters.priceMax}</span>
        </div>
        <input
          type="range" min={0} max={1000} step={50} value={filters.priceMax}
          onChange={(e) => update('priceMax', Number(e.target.value))}
          className="w-full cursor-pointer"
        />
        <div className="flex justify-between text-xs text-teal-400 mt-1">
          <span>$0</span>
          <span>$1000+</span>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-teal-100 to-transparent mb-5" />

      {/* Rating */}
      <div className="mb-5">
        <label className="block text-xs font-semibold uppercase tracking-widest text-teal-500 mb-3">Min Rating</label>
        <div className="grid grid-cols-2 gap-2">
          {[{ val: 0, label: 'Any' }, { val: 3, label: '3★+' }, { val: 4, label: '4★+' }, { val: 4.5, label: '4.5★+' }].map(({ val, label }) => (
            <button
              key={val}
              type="button"
              onClick={() => update('rating', val)}
              className={`py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                filters.rating === val
                  ? 'bg-teal-600 border-teal-600 text-white shadow-md'
                  : 'bg-cream-100 border-teal-100 text-teal-600 hover:border-teal-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-teal-100 to-transparent mb-5" />

      {/* Location */}
      <div className="mb-2">
        <label className="block text-xs font-semibold uppercase tracking-widest text-teal-500 mb-2">Location</label>
        <input
          type="text"
          placeholder="Paris, London, Tokyo…"
          value={filters.location}
          onChange={(e) => handleLocation(e.target.value)}
          list="city-suggestions"
          className="w-full px-3 py-2.5 bg-cream-100 border border-teal-100 rounded-xl text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50 transition-all text-teal-800 placeholder-teal-300"
        />
        <datalist id="city-suggestions">
          {Object.keys(CITY_PLACE_IDS).map((city) => (
            <option key={city} value={city.charAt(0).toUpperCase() + city.slice(1)} />
          ))}
        </datalist>
      </div>
    </aside>
  );
}