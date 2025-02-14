import axios from 'axios';

const mockServiceUrl = 'https://mockerrorapi.com/log';

export const reportErrorToService = async (errorDetails) => {
  try {
    // Tentar enviar para o servidor
    await axios.post(mockServiceUrl, errorDetails);
  } catch (onlineError) {
    // Fallback para localStorage
    const errors = JSON.parse(localStorage.getItem('errorQueue') || '[]');
    errors.push({ ...errorDetails, timestamp: new Date().toISOString() });
    localStorage.setItem('errorQueue', JSON.stringify(errors));
  }
};