import { useEffect, useCallback } from 'react';
import { useError } from '../contexts/ErrorContext';

export const useDebouncedSave = (saveAction, delay = 500) => {
  const { handleError } = useError();
  
  const debouncedSave = useCallback(
    _.debounce((content) => {
      try {
        saveAction(content);
      } catch (error) {
        handleError(error);
      }
    }, delay),
    [saveAction, delay]
  );

  useEffect(() => {
    return () => debouncedSave.cancel();
  }, []);

  return debouncedSave;
};