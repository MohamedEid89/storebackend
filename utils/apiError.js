// @desc This class is responsible about opration error (Error that can predict)
class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4) ? "fail" : "error";
    this.isOprational = true;
  }
}

module.exports = ApiError;
