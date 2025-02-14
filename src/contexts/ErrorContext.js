import React, { createContext, useState } from 'react';

export const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const handleError = (error) => {
    setError(error.message);
    setTimeout(() => setError(null), 5000);
  };

  return (
    <ErrorContext.Provider value={{ error, handleError }}>
      {children}
      {error && <div className="error-message">{error}</div>}
    </ErrorContext.Provider>
  );
};