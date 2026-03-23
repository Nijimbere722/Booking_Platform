// src/services/api.js
import axios from 'axios';

const API_KEY = import.meta.env.VITE_RAPID_API_KEY;

// Centralized Axios Instance
const apiClient = axios.create({
  baseURL: 'https://airbnb19.p.rapidapi.com/api/v2',
  headers: {
    'x-rapidapi-key': API_KEY,
    'x-rapidapi-host': 'airbnb19.p.rapidapi.com',
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`, config.params);
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 429)
      return Promise.reject(new Error('Rate limit exceeded. Please try again later.'));
    if (error.response?.status === 401 || error.response?.status === 403)
      return Promise.reject(new Error('Invalid API key. Check your .env configuration.'));
    return Promise.reject(new Error(error.response?.data?.message ?? 'API request failed.'));
  }
);

// ─── Mock Data ───────────────────────────────────────────────────────────────
const MOCK_LISTINGS = [
  {
    id: '1',
    name: 'Charming Studio in Central Paris',
    images: [{ url: 'https://picsum.photos/seed/paris1/400/280' }],
    price: { rate: 120, currency: 'USD' },
    rating: 4.8,
    reviewsCount: 124,
    city: 'Paris',
    country: 'France',
    type: 'Entire Studio',
    beds: 1,
    bathrooms: 1,
    isSuperhost: true,
  },
  {
    id: '2',
    name: 'Luxury Apartment near Eiffel Tower',
    images: [{ url: 'https://picsum.photos/seed/paris2/400/280' }],
    price: { rate: 250, currency: 'USD' },
    rating: 4.9,
    reviewsCount: 89,
    city: 'Paris',
    country: 'France',
    type: 'Entire Apartment',
    beds: 2,
    bathrooms: 1,
    isSuperhost: true,
  },
  {
    id: '3',
    name: 'Cozy Room in Montmartre',
    images: [{ url: 'https://picsum.photos/seed/paris3/400/280' }],
    price: { rate: 75, currency: 'USD' },
    rating: 4.5,
    reviewsCount: 56,
    city: 'Paris',
    country: 'France',
    type: 'Private Room',
    beds: 1,
    bathrooms: 1,
    isSuperhost: false,
  },
  {
    id: '4',
    name: 'Modern Loft in Le Marais',
    images: [{ url: 'https://picsum.photos/seed/paris4/400/280' }],
    price: { rate: 180, currency: 'USD' },
    rating: 4.7,
    reviewsCount: 203,
    city: 'Paris',
    country: 'France',
    type: 'Entire Loft',
    beds: 2,
    bathrooms: 2,
    isSuperhost: false,
  },
  {
    id: '5',
    name: 'Elegant Suite near Louvre',
    images: [{ url: 'https://picsum.photos/seed/paris5/400/280' }],
    price: { rate: 320, currency: 'USD' },
    rating: 4.95,
    reviewsCount: 312,
    city: 'Paris',
    country: 'France',
    type: 'Entire Suite',
    beds: 3,
    bathrooms: 2,
    isSuperhost: true,
  },
  {
    id: '6',
    name: 'Budget Studio near Metro',
    images: [{ url: 'https://picsum.photos/seed/paris6/400/280' }],
    price: { rate: 55, currency: 'USD' },
    rating: 4.2,
    reviewsCount: 41,
    city: 'Paris',
    country: 'France',
    type: 'Entire Studio',
    beds: 1,
    bathrooms: 1,
    isSuperhost: false,
  },
  {
    id: '7',
    name: 'Stylish Flat in Saint-Germain',
    images: [{ url: 'https://picsum.photos/seed/paris7/400/280' }],
    price: { rate: 200, currency: 'USD' },
    rating: 4.85,
    reviewsCount: 178,
    city: 'Paris',
    country: 'France',
    type: 'Entire Apartment',
    beds: 2,
    bathrooms: 1,
    isSuperhost: true,
  },
  {
    id: '8',
    name: 'Romantic Getaway in Champs-Élysées',
    images: [{ url: 'https://picsum.photos/seed/paris8/400/280' }],
    price: { rate: 290, currency: 'USD' },
    rating: 4.6,
    reviewsCount: 95,
    city: 'Paris',
    country: 'France',
    type: 'Entire Apartment',
    beds: 2,
    bathrooms: 2,
    isSuperhost: false,
  },
  {
    id: '9',
    name: 'Affordable Room in Bastille',
    images: [{ url: 'https://picsum.photos/seed/paris9/400/280' }],
    price: { rate: 65, currency: 'USD' },
    rating: 4.3,
    reviewsCount: 67,
    city: 'Paris',
    country: 'France',
    type: 'Private Room',
    beds: 1,
    bathrooms: 1,
    isSuperhost: false,
  },
  {
    id: '10',
    name: 'Penthouse with Eiffel Tower View',
    images: [{ url: 'https://picsum.photos/seed/paris10/400/280' }],
    price: { rate: 500, currency: 'USD' },
    rating: 5.0,
    reviewsCount: 45,
    city: 'Paris',
    country: 'France',
    type: 'Entire Penthouse',
    beds: 4,
    bathrooms: 3,
    isSuperhost: true,
  },
  {
    id: '11',
    name: 'Cozy Apartment in London Bridge',
    images: [{ url: 'https://picsum.photos/seed/london1/400/280' }],
    price: { rate: 150, currency: 'USD' },
    rating: 4.7,
    reviewsCount: 134,
    city: 'London',
    country: 'UK',
    type: 'Entire Apartment',
    beds: 2,
    bathrooms: 1,
    isSuperhost: true,
  },
  {
    id: '12',
    name: 'Modern Studio in Manhattan',
    images: [{ url: 'https://picsum.photos/seed/ny1/400/280' }],
    price: { rate: 220, currency: 'USD' },
    rating: 4.6,
    reviewsCount: 88,
    city: 'New York',
    country: 'USA',
    type: 'Entire Studio',
    beds: 1,
    bathrooms: 1,
    isSuperhost: false,
  },
  {
    id: '13',
    name: 'Luxury Villa in Dubai Marina',
    images: [{ url: 'https://picsum.photos/seed/dubai1/400/280' }],
    price: { rate: 450, currency: 'USD' },
    rating: 4.9,
    reviewsCount: 210,
    city: 'Dubai',
    country: 'UAE',
    type: 'Entire Villa',
    beds: 4,
    bathrooms: 3,
    isSuperhost: true,
  },
  {
    id: '14',
    name: 'Traditional Room in Tokyo',
    images: [{ url: 'https://picsum.photos/seed/tokyo1/400/280' }],
    price: { rate: 90, currency: 'USD' },
    rating: 4.8,
    reviewsCount: 156,
    city: 'Tokyo',
    country: 'Japan',
    type: 'Private Room',
    beds: 1,
    bathrooms: 1,
    isSuperhost: true,
  },
  {
    id: '15',
    name: 'Beachfront Apartment in Barcelona',
    images: [{ url: 'https://picsum.photos/seed/barcelona1/400/280' }],
    price: { rate: 175, currency: 'USD' },
    rating: 4.75,
    reviewsCount: 99,
    city: 'Barcelona',
    country: 'Spain',
    type: 'Entire Apartment',
    beds: 2,
    bathrooms: 1,
    isSuperhost: false,
  },
];

// ─── Data Normalization ───────────────────────────────────────────────────────
function normalizeListing(raw) {
  const listing = raw?.listing ?? raw;
  const pricingQuote = raw?.pricingQuote ?? {};

  return {
    id: String(listing?.id ?? listing?.listingId ?? Math.random()),
    name: String(listing?.name ?? listing?.title ?? 'Unnamed Property'),
    images: Array.isArray(listing?.contextualPictures)
      ? listing.contextualPictures.map((p) => ({ url: p?.picture ?? p?.url ?? '' }))
      : listing?.picture
        ? [{ url: listing.picture }]
        : [{ url: 'https://placehold.co/400x300?text=No+Image' }],
    price: {
      rate: Number(
        pricingQuote?.structuredStayDisplayPrice?.primaryLine?.price ??
        pricingQuote?.rate?.amount ??
        listing?.price ??
        0
      ),
      currency: String(pricingQuote?.rate?.currency ?? 'USD'),
    },
    rating: Number(
      listing?.avgRatingLocalized?.split(' ')?.[0] ??
      listing?.avgRating ??
      listing?.rating ??
      0
    ),
    reviewsCount: Number(listing?.reviewsCount ?? listing?.numberOfReviews ?? 0),
    city: String(listing?.city ?? listing?.publicAddress ?? listing?.smart_location ?? ''),
    country: String(listing?.country ?? listing?.countryCode ?? ''),
    type: String(listing?.roomTypeCategory ?? listing?.roomType ?? listing?.type ?? 'Property'),
    beds: Number(listing?.beds ?? listing?.bedrooms ?? 1),
    bathrooms: Number(listing?.bathrooms ?? 1),
    isSuperhost: Boolean(listing?.isSuperhost ?? listing?.is_superhost),
  };
}

// ─── API Functions ────────────────────────────────────────────────────────────
export async function fetchListings({ placeId, checkin, checkout, adults = 1, priceMax, priceMin }) {
  try {
    const params = { placeId, adults, currency: 'USD' };
    if (checkin) params.checkin = checkin;
    if (checkout) params.checkout = checkout;
    if (priceMax) params.priceMax = priceMax;
    if (priceMin) params.priceMin = priceMin;

    const { data } = await apiClient.get('/searchPropertyByPlaceId', { params });

    const results =
      data?.data?.list ??
      data?.data?.results ??
      data?.results ??
      data?.list ??
      (Array.isArray(data?.data) ? data.data : []) ??
      (Array.isArray(data) ? data : []);

    if (!results || results.length === 0) {
      console.warn('[API] No results returned, using mock data');
      return MOCK_LISTINGS;
    }

    return results.map(normalizeListing);
  } catch (error) {
    console.warn('[API] Falling back to mock data:', error.message);
    return MOCK_LISTINGS;
  }
}

export async function fetchListingById(id, placeId) {
  try {
    const listings = await fetchListings({ placeId });
    const found = listings.find((l) => l.id === id);
    if (!found) throw new Error('Listing not found');
    return {
      ...found,
      description: 'A beautiful property with amazing amenities and stunning views. Perfect for your next getaway.',
      amenities: ['WiFi', 'Kitchen', 'Air conditioning', 'Washer', 'Free parking', 'Pool', 'TV', 'Heating'],
      host: { name: 'Airbnb Host', isSuperhost: found.isSuperhost ?? false },
    };
  } catch (error) {
    // Find from mock data directly
    const found = MOCK_LISTINGS.find((l) => l.id === id);
    if (!found) throw new Error('Listing not found');
    return {
      ...found,
      description: 'A beautiful property with amazing amenities and stunning views. Perfect for your next getaway.',
      amenities: ['WiFi', 'Kitchen', 'Air conditioning', 'Washer', 'Free parking', 'Pool', 'TV', 'Heating'],
      host: { name: 'Airbnb Host', isSuperhost: found.isSuperhost ?? false },
    };
  }
}

export async function createBooking(bookingData) {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { ...bookingData, status: 'confirmed', id: `booking-${Date.now()}` };
}