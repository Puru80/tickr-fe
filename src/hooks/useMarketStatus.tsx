import { useState, useEffect } from 'react';
import { getMarketStatus } from '@/lib/api';
import { MarketStatus } from '@/types';

export function useMarketStatus() {
  const [marketStatus, setMarketStatus] = useState<MarketStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMarketStatus() {
      try {
        setLoading(true);
        const status = await getMarketStatus();
        setMarketStatus(status.data);
      } catch (err) {
        setError('Failed to fetch market status');
      } finally {
        setLoading(false);
      }
    }

    fetchMarketStatus();
    // Refresh every 5 minutes
    const intervalId = setInterval(fetchMarketStatus, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return { marketStatus, loading, error };
}
