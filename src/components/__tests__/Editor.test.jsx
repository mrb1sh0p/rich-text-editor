import { render, screen, fireEvent } from '@testing-library/react';
import Editor from '../Editor';

test('formata texto em negrito ao clicar no botão', async () => {
  render(<Editor />);
  
  const editor = screen.getByRole('textbox');
  const boldButton = screen.getByLabelText('Negrito');
  
  // Selecionar texto
  fireEvent.mouseUp(editor, { target: { innerHTML: 'teste' } });
  
  // Aplicar negrito
  fireEvent.click(boldButton);
  
  expect(document.queryCommandState('bold')).toBe(true);
});