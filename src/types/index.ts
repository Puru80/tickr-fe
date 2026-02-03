// Core type definitions for Tickr

export type Exchange = 'NSE' | 'BSE' | 'CRYPTO';

export type ReferenceType = 'MARKET' | 'CUSTOM';

export interface Instrument {
  id: string;
  tradingSymbol: string;
  name: string;
  exchange: Exchange;
  referenceType: ReferenceType;
  referencePrice: number;
  lastPrice: number;
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
  instrumentName: string;
  exchange: string;
  lastPrice: number;
  open: number;
  high: number;
  close: number;
  low: boolean;
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
  tradingSymbol: string;
  name: string;
  exchange: Exchange;
  referenceType: ReferenceType;
  referencePrice?: number;
}

export interface MarketStatus {
  open: boolean;
}
