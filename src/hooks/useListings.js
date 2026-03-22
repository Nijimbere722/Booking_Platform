// src/hooks/useListings.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchListings, fetchListingById, createBooking } from '../services/api';

export function useListings({ placeId, checkin, checkout, priceMax, priceMin, rating }) {
  return useQuery({
    queryKey: ['listings', placeId, checkin, checkout, priceMax, priceMin],
    queryFn: () => fetchListings({ placeId, checkin, checkout, priceMax, priceMin }),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
    enabled: Boolean(placeId),
    select: (data) => {
      if (!rating || rating === 0) return data;
      return data.filter((l) => l.rating >= rating);
    },
  });
}

export function useListingDetail(id, placeId) {
  return useQuery({
    queryKey: ['listing', id, placeId],
    queryFn: () => fetchListingById(id, placeId),
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    retry: 1,
    enabled: Boolean(id && placeId),
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}

export function useBookings(userId) {
  return useQuery({
    queryKey: ['bookings', userId],
    queryFn: () => {
      const stored = JSON.parse(localStorage.getItem('smartstay-bookings') || '{}');
      return stored?.state?.bookings ?? [];
    },
    staleTime: 0,
    enabled: Boolean(userId),
  });
}