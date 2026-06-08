/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Destination {
  id: string;
  name: string;
  country: string;
  tagline: string;
  description: string;
  heroImage: string;
  additionalImages?: string[];
  essentialTag?: string; // e.g. "ESSENTIAL", "EXCLUSIVE"
  tagColor?: string; // red, blue, yellow, etc.
  established?: string; // e.g. "EST. 1954"
  quote?: string;
  quoteAuthor?: string;
}

export interface Experience {
  id: string;
  destinationId: string;
  title: string;
  price: number;
  image: string;
  description: string;
  duration?: string;
}

export interface Suite {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  size: string;
  tag?: string; // e.g. "BEST VALUE", "POPULAR"
  tagColor?: string; // "red" or "cyan"
  amenities: string[];
}

export interface Article {
  id: string;
  title: string;
  category: string;
  categoryColor?: string;
  description: string;
  image: string;
  date: string;
  readTime: string;
  featured?: boolean;
  author?: {
    name: string;
    avatar: string;
  };
}

export interface Booking {
  id: string;
  destinationId: string;
  experienceId?: string;
  suiteId?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice?: number;
  total: number;
  subtotal: number;
  tax: number;
  status: 'pending' | 'confirmed';
}

export interface UserProfile {
  name: string;
  avatar: string;
  tier: 'Gold Tier' | 'Platinum Tier' | 'Diamond Tier';
  points: number;
  pointsToNextTier: number;
  status: string;
}
