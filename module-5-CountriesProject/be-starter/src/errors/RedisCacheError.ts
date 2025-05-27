import { CustomError } from "./CustomError";

export class RedisCacheError extends CustomError {
  statusCode = 500;

  constructor(message = 'Redis cache error' ) {
    super(message);
    this.message = message
    Object.setPrototypeOf(this, RedisCacheError.prototype)
  }

  serializeError(){
    return { message: this.message };
  }
}