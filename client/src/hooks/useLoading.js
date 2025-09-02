import { useCallback, useState } from 'react';

/**
 * Generic loading state management hook
 * @param {boolean} initialState - Initial loading state
 * @returns {object} - Loading state and control functions
 */
export const useLoading = (initialState = false) => {
  const [isLoading, setIsLoading] = useState(initialState);
  const [loadingStates, setLoadingStates] = useState({});

  const setLoading = useCallback((loading) => {
    setIsLoading(loading);
  }, []);

  const setItemLoading = useCallback((key, loading) => {
    setLoadingStates((prev) => ({
      ...prev,
      [key]: loading,
    }));
  }, []);

  const isItemLoading = useCallback(
    (key) => {
      return loadingStates[key] || false;
    },
    [loadingStates]
  );

  const resetLoading = useCallback(() => {
    setIsLoading(false);
    setLoadingStates({});
  }, []);

  return {
    isLoading,
    loadingStates,
    setLoading,
    setItemLoading,
    isItemLoading,
    resetLoading,
  };
};
