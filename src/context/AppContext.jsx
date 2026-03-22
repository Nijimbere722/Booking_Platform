// src/context/AppContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext(null);

export const DEFAULT_PLACE_ID = 'ChIJD7fiBh9u5kcRYJSMaMOCCwQ';

export const CITY_PLACE_IDS = {
  paris: 'ChIJD7fiBh9u5kcRYJSMaMOCCwQ',
  london: 'ChIJdd4hrwug2EcRmSrV3Vo6llI',
  'new york': 'ChIJOwg_06VPwokRYv534QaPC8g',
  tokyo: 'ChIJ51cu8IcbXWARiRtXIothAS4',
  dubai: 'ChIJRcbZaklDXz4RYlEphFBu5r0',
  barcelona: 'ChIJ5TCOcRaYpBIRCmZHTz37sEQ',
  rome: 'ChIJu46S-ZZhLxMROG5lkwZ3D7k',
  amsterdam: 'ChIJVXealLU_xkcRja_At0z9AGQ',
};

export function AppProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('smartstay-favorites') ?? '[]'); }
    catch { return []; }
  });

  const [filters, setFilters] = useState({
    priceMin: 0,
    priceMax: 1000,
    rating: 0,
    location: '',
    checkin: '',
    checkout: '',
  });

  const [placeId, setPlaceId] = useState(DEFAULT_PLACE_ID);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('smartstay-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) =>
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );

  const isFavorite = (id) => favorites.includes(id);

  return (
    <AppContext.Provider
      value={{
        favorites, toggleFavorite, isFavorite,
        filters, setFilters,
        placeId, setPlaceId,
        searchQuery, setSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}