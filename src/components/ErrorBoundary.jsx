import React, { Component } from 'react';
import { useError } from '../contexts/ErrorContext';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    const { logError } = this.props;
    logError({
      error: error.toString(),
      stack: errorInfo.componentStack,
      context: 'UI Boundary'
    });
  }

  render() {
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

export default function ErrorBoundaryWrapper(props) {
  const { logError } = useError();
  return <ErrorBoundary logError={logError} {...props} />;
}