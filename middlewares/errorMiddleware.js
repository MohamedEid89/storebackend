const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV == "development") {
    sendErrorForDev(err, res);
  } else {
    sendErrorForProd(err, res);
  }
};

// Response for development mode
const sendErrorForDev = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    Error: err,
    message: err.message,
    stack: err.stack,
  });
};
// Response for production mode
const sendErrorForProd = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
module.exports = globalError;
