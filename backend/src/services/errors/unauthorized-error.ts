import { ApiError } from './api-error';

export class UnauthorizedError extends ApiError {
  constructor() {
    super({
      statusCode: 401,
      message: 'Invalid credentials.',
    });
  }
}
