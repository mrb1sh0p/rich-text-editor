import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Editor from '../components/Editor';

test('auto-save após 500ms de inatividade', async () => {
  jest.useFakeTimers();
  
  render(<Editor />);
  
  const editor = screen.getByRole('textbox');
  
  fireEvent.input(editor, {
    target: { innerHTML: 'Primeira alteração' }
  });
  
  fireEvent.input(editor, {
    target: { innerHTML: 'Segunda alteração' }
  });

  // Avança o tempo em 500ms
  jest.advanceTimersByTime(500);
  
  await waitFor(() => {
    expect(localStorage.getItem('editorContent')).toBe('Segunda alteração');
  });
});