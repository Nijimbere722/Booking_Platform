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
    <aside className="w-64 shrink-0 bg-white border border-gray-200 rounded-xl p-6 h-fit sticky top-20">
      <h3 className="font-bold text-base mb-5">Filters</h3>

      <div className="mb-4">
        <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Check-in</label>
        <input
          type="date"
          value={filters.checkin}
          min={new Date().toISOString().split('T')[0]}
          onChange={(e) => update('checkin', e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-rose-500 transition-colors"
        />
      </div>

      <div className="mb-5">
        <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Check-out</label>
        <input
          type="date"
          value={filters.checkout}
          min={filters.checkin || new Date().toISOString().split('T')[0]}
          onChange={(e) => update('checkout', e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-rose-500 transition-colors"
        />
      </div>

      <div className="mb-5">
        <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Max Price / Night</label>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>$0</span>
          <input
            type="range" min={0} max={1000} step={50} value={filters.priceMax}
            onChange={(e) => update('priceMax', Number(e.target.value))}
            className="flex-1 accent-rose-500 cursor-pointer"
          />
          <span>${filters.priceMax}+</span>
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Min Rating</label>
        <div className="flex gap-2 flex-wrap">
          {[0, 3, 4, 4.5].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => update('rating', r)}
              className={`px-3 py-1 rounded-full text-xs border transition-all cursor-pointer ${
                filters.rating === r
                  ? 'border-rose-500 bg-rose-50 text-rose-500'
                  : 'border-gray-200 hover:border-rose-400 text-gray-600'
              }`}
            >
              {r === 0 ? 'Any' : `${r}★+`}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Location</label>
        <input
          type="text"
          placeholder="Paris, London, Tokyo…"
          value={filters.location}
          onChange={(e) => handleLocation(e.target.value)}
          list="city-suggestions"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-rose-500 transition-colors"
        />
        <datalist id="city-suggestions">
          {Object.keys(CITY_PLACE_IDS).map((city) => (
            <option key={city} value={city.charAt(0).toUpperCase() + city.slice(1)} />
          ))}
        </datalist>
      </div>

      <button
        type="button"
        onClick={reset}
        className="w-full border border-gray-200 rounded-lg py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
      >
        Reset Filters
      </button>
    </aside>
  );
}