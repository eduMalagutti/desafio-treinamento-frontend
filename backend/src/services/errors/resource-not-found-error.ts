import { ApiError } from './api-error';

export class ResourceNotFoundError extends ApiError {
  constructor(resource: string) {
    super({
      statusCode: 404,
      message: `${resource[0].toUpperCase() + resource.slice(1)} does not exist.`,
    });
  }
}
