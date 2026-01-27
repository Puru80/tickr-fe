import { MarketIndex, Watchlist, User } from '@/types';

export const mockUser: User = {
  id: '1',
  name: 'Arjun Sharma',
  email: 'arjun@tickr.io',
  avatar: undefined,
};

export const mockMarketIndices: MarketIndex[] = [
  {
    id: '1',
    name: 'NIFTY 50',
    symbol: 'NIFTY',
    value: 24780.25,
    change: 156.40,
    changePercent: 0.64,
    isPositive: true,
  },
  {
    id: '2',
    name: 'SENSEX',
    symbol: 'SENSEX',
    value: 81542.30,
    change: -234.15,
    changePercent: -0.29,
    isPositive: false,
  },
  {
    id: '3',
    name: 'BANK NIFTY',
    symbol: 'BANKNIFTY',
    value: 52156.85,
    change: 423.60,
    changePercent: 0.82,
    isPositive: true,
  },
];