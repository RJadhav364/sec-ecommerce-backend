// utils/conflictError.js
const conflictError = (passedStatuscode, message) => {
  const error = new Error(message);
  error.statusCode = passedStatuscode;
  throw error;
};

export default conflictError;