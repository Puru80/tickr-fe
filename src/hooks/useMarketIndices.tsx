
import { useState, useEffect } from 'react';
import { MarketIndex } from '@/types';
import { getMarketIndices } from '@/lib/api';

export function useMarketIndices() {
  const [indices, setIndices] = useState<MarketIndex[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIndices = async () => {
      setLoading(true);
      try {
        const indicesData = await getMarketIndices();
        setIndices(indicesData.data);
      } catch (error) {
        console.error('Failed to fetch market indices:', error);
        // Handle error appropriately
      } finally {
        setLoading(false);
      }
    };

    fetchIndices();
  }, []);

  return { indices, loading };
}
