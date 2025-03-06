import { ArgumentsHost, Catch, HttpException, UnauthorizedException } from '@nestjs/common';
import { ApiError } from './services/errors/api-error';

@Catch(ApiError)
export class ErrorHandler {
  catch(exception: ApiError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    response.status(exception.statusCode).json({
      statusCode: exception.statusCode,
      message: exception.message,
      errors: exception.errors,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
