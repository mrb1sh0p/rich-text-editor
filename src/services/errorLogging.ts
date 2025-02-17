export const reportErrorToService = async (errorDetails: any) => {
  try {
    const errors = JSON.parse(localStorage.getItem("errorQueue") || "[]");
    errors.push({ ...errorDetails, timestamp: new Date().toISOString() });
    localStorage.setItem("errorQueue", JSON.stringify(errors));
  } catch (onlineError) {
    const errors = JSON.parse(localStorage.getItem("errorQueue") || "[]");
    errors.push({ ...errorDetails, timestamp: new Date().toISOString() });
    localStorage.setItem("errorQueue", JSON.stringify(errors));
  }
};
