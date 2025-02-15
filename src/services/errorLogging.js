export const reportErrorToService = async (errorDetails) => {
  try {
    const errors = JSON.parse(localStorage.getItem('errorQueue') || '[]');
    errors.push({ ...errorDetails, timestamp: new Date().toISOString() });
    localStorage.setItem('errorQueue', JSON.stringify(errors));
  } catch (onlineError) {
    const errors = JSON.parse(localStorage.getItem('errorQueue') || '[]');
    errors.push({ ...errorDetails, timestamp: new Date().toISOString() });
    localStorage.setItem('errorQueue', JSON.stringify(errors));
  }
};