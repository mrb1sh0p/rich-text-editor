import { useCallback, useEffect, useRef } from 'react';
import debounce from 'lodash.debounce';

type SaveAction = (content: string) => Promise<void> | void;

export const useDebouncedSave = (
  saveAction: SaveAction,
  delay: number = 500
): ((content: string) => void) => {
  const debouncedSaveRef = useRef(
    debounce((content: string) => {
      const result = saveAction(content);
      if (result instanceof Promise) {
        result.catch(console.error);
      }
    }, delay)
  );

  useEffect(() => {
    return () => debouncedSaveRef.current.cancel();
  }, []);

  return useCallback((content: string) => {
    debouncedSaveRef.current(content);
  }, []);
};