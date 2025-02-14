import { useState, useCallback, useContext, createContext } from "react";
import { reportErrorToService } from "../services/errorLogging";

export const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const logError = useCallback(async (errorDetails) => {
    try {
      await reportErrorToService(errorDetails);
      setError(errorDetails.error);
    } catch (loggingError) {
      console.error("Falha no log de erro:", loggingError);
    }
  }, []);

  const handleError = useCallback(
    (error) => {
      console.error("Erro tratado:", error);
      setError(error.message);
      logError({
        error: error.message,
        stack: error.stack,
        context: "Manual Error",
      });
    },
    [logError]
  );

  return (
    <ErrorContext.Provider value={{ error, handleError, logError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
};
