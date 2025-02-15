import { sanitizeHTML } from './sanitize';

describe('HTML Sanitization', () => {
  test('remove scripts', () => {
    const dirty = '<script>alert("xss")</script><p>Safe</p>';
    const clean = sanitizeHTML(dirty);
    expect(clean).not.toContain('script');
  });

  test('mantém formatação básica', () => {
    const html = '<h1>Título</h1><p>Texto <strong>negrito</strong></p>';
    const clean = sanitizeHTML(html);
    expect(clean).toMatch(/<h1>.*<\/h1>/);
    expect(clean).toMatch(/<strong>.*<\/strong>/);
  });
});