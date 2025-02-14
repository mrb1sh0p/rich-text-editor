// src/tests/ErrorBoundary.test.jsx
import { render, screen } from '@testing-library/react';
import ErrorBoundaryWrapper from '../components/ErrorBoundary';

const Bomb = ({ shouldExplode }) => {
  if (shouldExplode) throw new Error('💥 KABOOM');
  return null;
};

test('exibe fallback UI quando há erro', () => {
  render(
    <ErrorBoundaryWrapper>
      <Bomb shouldExplode />
    </ErrorBoundaryWrapper>
  );
  
  expect(screen.getByText(/Ops! Algo deu errado/i)).toBeInTheDocument();
});