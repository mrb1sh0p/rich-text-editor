import React, { Component, ReactNode, ErrorInfo } from "react";
import { useError } from "@/contexts/ErrorContext";

interface ErrorBoundaryProps {
  children: ReactNode;
  logError: (errorDetails: ErrorDetails) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorDetails {
  error: string;
  stack?: string;
  context: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.props.logError({
      error: error.toString(),
      stack: errorInfo.componentStack ?? undefined,
      context: "UI Boundary",
    });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>⚠️ Ops! Algo deu errado</h2>
          <button onClick={() => window.location.reload()}>
            Recarregar Aplicação
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export const ErrorBoundaryWrapper: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { logError } = useError();
  return <ErrorBoundary logError={logError}>{children}</ErrorBoundary>;
};
