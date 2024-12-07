import { ValidationError } from 'zod-validation-error';
import { ApiError } from '../../services/errors/api-error';

export class ZodValidationFailedError extends ApiError {
  constructor(errors: ValidationError) {
    super({
      statusCode: 400,
      message: 'Validation failed.',
      errors,
    });
  }
}
