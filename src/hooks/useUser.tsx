import { useState, useEffect } from 'react';
import { User } from '@/types';
import { getUser } from '@/lib/api';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const userData = await getUser();
        setUser(userData.data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        // Handle error appropriately
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading };
}
