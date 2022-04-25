/* eslint-disable no-console */
import { useState } from 'react';

function useFetch(callback: () => void) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetch = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      await callback();
    } catch (e) {
      setIsError(true);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2500);
    }
  };

  return [fetch, isLoading, isError] as const;
}

export { useFetch };
