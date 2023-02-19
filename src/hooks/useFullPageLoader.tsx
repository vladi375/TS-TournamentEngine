import { useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

export const useFullPageLoader = () => {
  const [loading, setLoading] = useState(false);
  return [
    loading ? <LoadingSpinner /> : false,
    () => setLoading(true),
    () => setLoading(false),
  ] as const;
};

export default useFullPageLoader;
