/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { create } from "zustand";
import { Booking, UserProfile, Destination, Suite, Experience } from "./types";
import {
  USER_MOCK,
  DESTINATIONS,
  HOTEL_SUITES,
  EXPERIENCES_AMALFI,
} from "./data";

interface AppState {
  // Auth state
  user: UserProfile;
  isAuthenticated: boolean;
  updateUserPoints: (points: number) => void;

  // Navigation / UI state
  activePage:
    | "home"
    | "amalfi"
    | "itinerary"
    | "stays"
    | "hotel"
    | "checkout"
    | "dashboard"
    | "dispatch"
    | "about"
    | "support"
    | "admin";
  setActivePage: (
    page:
      | "home"
      | "amalfi"
      | "itinerary"
      | "stays"
      | "hotel"
      | "checkout"
      | "dashboard"
      | "dispatch"
      | "about"
      | "support"
      | "admin",
  ) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;

  // Custom Cursor Status
  cursorHovered: boolean;
  setCursorHovered: (hovered: boolean) => void;

  // Search Results
  filteredDestinations: Destination[];
  triggerSearch: (query: string) => void;

  // Booking details state
  currentBooking: {
    destinationId: string;
    experienceId?: string;
    suiteId?: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    subtotal: number;
    tax: number;
    total: number;
  };
  setBookingDetails: (details: Partial<AppState["currentBooking"]>) => void;
  confirmBooking: () => void;
  pastBookings: Booking[];

  // Wishlist
  wishlist: string[]; // destination IDs
  toggleWishlist: (id: string) => void;

  // Cart / active item selection
  selectedSuite: Suite | null;
  setSelectedSuite: (suite: Suite | null) => void;
  selectedExperience: Experience | null;
  setSelectedExperience: (exp: Experience | null) => void;
}

const initialBookingState = {
  destinationId: "amalfi",
  checkIn: "2026-10-12",
  checkOut: "2026-10-16",
  guests: 2,
  subtotal: 3400,
  tax: 408,
  total: 3808,
};

export const useAppStore = create<AppState>((set, get) => ({
  user: USER_MOCK,
  isAuthenticated: true,
  updateUserPoints: (points) =>
    set((state) => ({
      user: { ...state.user, points: state.user.points + points },
    })),

  activePage: "home",
  setActivePage: (page) => {
    set({ activePage: page });
    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  selectedDate: "2026-10-12",
  setSelectedDate: (date) => set({ selectedDate: date }),

  cursorHovered: false,
  setCursorHovered: (hovered) => set({ cursorHovered: hovered }),

  filteredDestinations: DESTINATIONS,
  triggerSearch: (query) => {
    if (!query.trim()) {
      set({ filteredDestinations: DESTINATIONS });
      return;
    }
    const filtered = DESTINATIONS.filter(
      (d) =>
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.country.toLowerCase().includes(query.toLowerCase()) ||
        d.tagline.toLowerCase().includes(query.toLowerCase()),
    );
    set({ filteredDestinations: filtered });
  },

  currentBooking: initialBookingState,
  setBookingDetails: (details) =>
    set((state) => {
      const updated = { ...state.currentBooking, ...details };
      // Auto-calculate values
      const guestsFactor = updated.guests || 2;
      // Base prices for calculation
      const suitePrice = state.selectedSuite ? state.selectedSuite.price : 850;
      const additionalPrice = state.selectedExperience
        ? state.selectedExperience.price
        : 0;

      // 4 nights default
      const nights = 4;
      const subtotal = suitePrice * nights + additionalPrice;
      const tax = Math.round(subtotal * 0.12);
      const total = subtotal + tax;

      return {
        currentBooking: {
          ...updated,
          subtotal,
          tax,
          total,
        },
      };
    }),

  pastBookings: [
    {
      id: "BK-9801",
      destinationId: "kyoto",
      checkIn: "2026-10-24",
      checkOut: "2026-11-02",
      guests: 2,
      subtotal: 7800,
      tax: 936,
      total: 8736,
      status: "confirmed",
    },
    {
      id: "BK-4421",
      destinationId: "santorini",
      checkIn: "2026-12-12",
      checkOut: "2026-12-18",
      guests: 2,
      subtotal: 4500,
      tax: 540,
      total: 5040,
      status: "confirmed",
    },
  ],

  confirmBooking: () => {
    const { currentBooking, pastBookings, user } = get();
    const newBooking: Booking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      destinationId: currentBooking.destinationId,
      checkIn: currentBooking.checkIn,
      checkOut: currentBooking.checkOut,
      guests: currentBooking.guests,
      subtotal: currentBooking.subtotal,
      tax: currentBooking.tax,
      total: currentBooking.total,
      status: "confirmed",
    };

    // Add points
    const pointsEarned = Math.round(currentBooking.total / 10);

    set({
      pastBookings: [newBooking, ...pastBookings],
      user: {
        ...user,
        points: user.points + pointsEarned,
      },
    });
  },

  wishlist: ["paris"],
  toggleWishlist: (id) =>
    set((state) => {
      const exists = state.wishlist.includes(id);
      return {
        wishlist: exists
          ? state.wishlist.filter((item) => item !== id)
          : [...state.wishlist, id],
      };
    }),

  selectedSuite: HOTEL_SUITES[0],
  setSelectedSuite: (suite) =>
    set((state) => {
      const sPrice = suite ? suite.price : 850;
      const nights = 4;
      const subtotal = sPrice * nights;
      const tax = Math.round(subtotal * 0.12);
      const total = subtotal + tax;
      return {
        selectedSuite: suite,
        currentBooking: {
          ...state.currentBooking,
          subtotal,
          tax,
          total,
        },
      };
    }),

  selectedExperience: EXPERIENCES_AMALFI[0],
  setSelectedExperience: (exp) =>
    set((state) => {
      const ePrice = exp ? exp.price : 0;
      const sPrice = state.selectedSuite ? state.selectedSuite.price : 850;
      const nights = 4;
      const subtotal = sPrice * nights + ePrice;
      const tax = Math.round(subtotal * 0.12);
      const total = subtotal + tax;
      return {
        selectedExperience: exp,
        currentBooking: {
          ...state.currentBooking,
          subtotal,
          tax,
          total,
        },
      };
    }),
}));
