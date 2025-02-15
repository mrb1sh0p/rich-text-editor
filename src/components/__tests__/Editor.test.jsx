import { render, screen, fireEvent } from '@testing-library/react';
import Editor from '../Editor';
import { useError } from '../../contexts/ErrorContext';

// Mock do contexto de erros
jest.mock('../contexts/ErrorContext');

describe('Editor Component', () => {
  beforeEach(() => {
    useError.mockReturnValue({
      handleError: jest.fn()
    });
    
    // Mock do execCommand
    global.document.execCommand = jest.fn();
    global.document.queryCommandState = jest.fn();
    global.document.queryCommandValue = jest.fn();
  });

  test('renderiza corretamente', () => {
    render(<Editor />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('formatação em negrito', async () => {
    render(<Editor />);
    const boldButton = screen.getByLabelText(/negrito/i);
    
    fireEvent.click(boldButton);
    expect(document.execCommand).toHaveBeenCalledWith('bold', false, null);
  });

  test('altera formatação de bloco', async () => {
    render(<Editor />);
    const blockSelect = screen.getByLabelText(/formatar bloco/i);
    
    fireEvent.change(blockSelect, { target: { value: 'h2' } });
    expect(document.execCommand).toHaveBeenCalledWith('formatBlock', false, 'h2');
  });

  test('undo/redo estados', async () => {
    render(<Editor />);
    
    const undoButton = screen.getByLabelText(/desfazer/i);
    const redoButton = screen.getByLabelText(/refazer/i);

    // Simula histórico vazio
    expect(undoButton).toBeDisabled();
    expect(redoButton).toBeDisabled();
  });

  test('exibe erro ao falhar formatação', async () => {
    document.execCommand.mockImplementation(() => {
      throw new Error('Format error');
    });
    
    render(<Editor />);
    const boldButton = screen.getByLabelText(/negrito/i);
    
    fireEvent.click(boldButton);
    expect(useError().handleError).toHaveBeenCalled();
  });
});