import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface ErrorContextType {
  error: string | null;
  handleError: (error: Error) => void;
  logError: (errorDetails: ErrorDetails) => void;
}

interface ErrorDetails {
  error: string;
  stack?: string;
  context: string;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [error] = useState<string | null>(null);

  const logError = useCallback(async (errorDetails: ErrorDetails) => {
    // Implementação...
  }, []);

  const handleError = useCallback((error: Error) => {
    // Implementação...
  }, []);

  return (
    <ErrorContext.Provider value={{ error, handleError, logError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = (): ErrorContextType => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};