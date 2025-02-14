import axios from 'axios';

const mockServiceUrl = 'https://mockerrorapi.com/log';

export const reportErrorToService = async (errorDetails) => {
  try {
    await axios.post(mockServiceUrl, {
      ...errorDetails,
      meta: {
        userAgent: navigator.userAgent,
        url: window.location.href,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    throw new Error('Error logging failed');
  }
};