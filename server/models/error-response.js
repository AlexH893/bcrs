/*
 * Author: Professor Krasso
 * Date: 11.10.2021
 * Description: Handles error messages
 */

class ErrorResponse {
  constructor(httpCode, message, data) {
    this.httpCode = httpCode;
    this.message = message;
    this.data = data;
  }
  toObject() {
    return {
      httpCode: this.httpCode,
      data: this.data,
      message: this.message,

      timestamp: new Date().toLocaleDateString(),
    };
  }
}
module.exports = ErrorResponse;
