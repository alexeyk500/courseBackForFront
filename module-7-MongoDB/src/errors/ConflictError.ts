import { CustomError } from './CustomError';

export class ConflictError extends CustomError {
  statusCode = 409;

  constructor(message = 'Conflict error') {
    super(message);
    this.message = message;
    Object.setPrototypeOf(this, ConflictError.prototype);
  }

  serializeError() {
    return { message: this.message };
  }
}
