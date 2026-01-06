// Core type definitions for Tickr

export type Market = 'NSE' | 'BSE' | 'CRYPTO';

export type ReferenceType = 'market' | 'custom';

export interface Instrument {
  id: string;
  ticker: string;
  name: string;
  market: Market;
  referenceType: ReferenceType;
  referencePrice: number;
  currentPrice: number;
  addedAt: Date;
}

export interface Watchlist {
  id: string;
  name: string;
  instruments: Instrument[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MarketIndex {
  id: string;
  name: string;
  symbol: string;
  value: number;
  change: number;
  changePercent: number;
  isPositive: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Utility types
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  key: keyof Instrument;
  direction: SortDirection;
}

// Form types
export interface AddInstrumentFormData {
  ticker: string;
  name: string;
  market: Market;
  referenceType: ReferenceType;
  customPrice?: number;
}

export interface CreateWatchlistFormData {
  name: string;
}
