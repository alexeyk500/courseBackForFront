import { CustomError } from './custom-error';

export default class authError extends CustomError {
  statusCode = 401;

  constructor(message = 'Unauthorized') {
    super(message);
    this.message = message;
    Object.setPrototypeOf(this, authError.prototype);
  }

  serializeError() {
    return { message: this.message };
  }
}
