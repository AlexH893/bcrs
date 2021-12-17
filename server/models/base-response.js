/*
 * Author: Professor Krasso
 * Modified by: Alex Haefner
 * Date: 11.10.2021
 * Description: Handles error messages
 */

class BaseResponse {
  constructor(code, msg, data) {
    this.code = code;
    this.msg = msg;
    this.data = data;
  }

  toObject() {
    return {
      code: this.code,
      msg: this.msg,
      data: this.data,
      timestamp: new Date().toLocaleDateString(),
    };
  }
}

module.exports = BaseResponse;
