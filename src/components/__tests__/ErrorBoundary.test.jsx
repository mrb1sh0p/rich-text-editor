import { render, screen } from '@testing-library/react';
import ErrorBoundaryWrapper from '../ErrorBoundary';

const Bomb = ({ shouldExplode }) => {
  if (shouldExplode) throw new Error('💥 KABOOM');
  return null;
};

describe('Error Boundary', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  test('exibe fallback UI em caso de erro', () => {
    render(
      <ErrorBoundaryWrapper>
        <Bomb shouldExplode />
      </ErrorBoundaryWrapper>
    );
    
    expect(screen.getByText(/ops! algo deu errado/i)).toBeInTheDocument();
  });
});