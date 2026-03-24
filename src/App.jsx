// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar'; 
import Home from './pages/Home';
import ListingDetails from './pages/ListingDetails';
import Bookings from './pages/Bookings';
import Favorites from './pages/Favorites';
import Login from './pages/Login';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <BrowserRouter>
          <Navbar />
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/listing/:id" element={<ListingDetails />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AppProvider>
    </QueryClientProvider>
  );
}