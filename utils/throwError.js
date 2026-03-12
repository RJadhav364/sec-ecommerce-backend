const throwError = (message, statusCode) => {
  const error = new Error(message || "Internal Server Error");
  error.statusCode = statusCode|| 500;
  throw error;
};

export default throwError;