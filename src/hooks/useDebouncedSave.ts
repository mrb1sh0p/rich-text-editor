import { useCallback, useEffect, useRef } from "react";
import debounce from "lodash.debounce";

type SaveAction = (content: string) => Promise<void> | void;

export const useDebouncedSave = (
  saveAction: SaveAction,
  delay: number = 1000
) => {
  const debouncedSaveRef = useRef(
    debounce(async (content: string) => {
      try {
        await saveAction(content);
      } catch (error) {
        console.error("Save error:", error);
      }
    }, delay)
  );

  useEffect(() => {
    const debouncedSave = debouncedSaveRef.current;
    return () => debouncedSave.cancel();
  }, []);

  return useCallback((content: string) => {
    debouncedSaveRef.current(content);
  }, []);
};
