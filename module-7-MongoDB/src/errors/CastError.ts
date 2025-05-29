import { CustomError } from './CustomError';

export class CastError extends CustomError {
  statusCode = 409;

  constructor(message = 'Cast error') {
    super(message);
    this.message = message;
    Object.setPrototypeOf(this, CastError.prototype);
  }

  serializeError() {
    return { message: this.message };
  }
}
