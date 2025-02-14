// src/hooks/useDebouncedSave.js
import { useCallback, useEffect, useRef } from 'react';
import { debounce } from 'lodash.debounce';

export const useDebouncedSave = (saveAction, delay = 500) => {
  const debouncedSaveRef = useRef(
    debounce(async (content) => {
      try {
        await saveAction(content);
      } catch (error) {
        console.error('Auto-save failed:', error);
      }
    }, delay)
  );

  useEffect(() => {
    return () => debouncedSaveRef.current.cancel();
  }, []);

  return useCallback((content) => {
    debouncedSaveRef.current(content);
  }, []);
};