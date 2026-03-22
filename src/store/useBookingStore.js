// src/store/useBookingStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useBookingStore = create(
  persist(
    (set) => ({
      bookings: [],
      user: null,

      addBooking: (booking) =>
        set((state) => ({ bookings: [...state.bookings, booking] })),

      cancelBooking: (id) =>
        set((state) => ({
          bookings: state.bookings.map((b) =>
            b.id === id ? { ...b, status: 'cancelled' } : b
          ),
        })),

      setUser: (user) => set({ user }),
    }),
    { name: 'smartstay-bookings' }
  )
);