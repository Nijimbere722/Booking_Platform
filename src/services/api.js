// src/services/api.js
import axios from 'axios';

const API_KEY = import.meta.env.VITE_RAPID_API_KEY;

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

export async function fetchListings({ placeId, checkin, checkout, adults = 1, priceMax, priceMin }) {
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

  return results.map(normalizeListing);
}

export async function fetchListingById(id, placeId) {
  const listings = await fetchListings({ placeId });
  const found = listings.find((l) => l.id === id);
  if (!found) throw new Error('Listing not found');
  return {
    ...found,
    description: 'A beautiful property with amazing amenities and stunning views.',
    amenities: ['WiFi', 'Kitchen', 'Air conditioning', 'Washer', 'Free parking', 'Pool', 'TV', 'Heating'],
    host: { name: 'Airbnb Host', isSuperhost: found.isSuperhost ?? false },
  };
}

export async function createBooking(bookingData) {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { ...bookingData, status: 'confirmed', id: `booking-${Date.now()}` };
}