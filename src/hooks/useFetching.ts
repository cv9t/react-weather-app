import { useState } from 'react';

function useFetching(cb: () => void) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetching = async () => {
    try {
      setIsLoading(true);
      await cb();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading] as const;
}

export { useFetching };
