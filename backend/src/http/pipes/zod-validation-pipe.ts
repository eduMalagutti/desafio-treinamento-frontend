import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { ZodValidationFailedError } from './zod-validation-failed-error';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ZodValidationFailedError(fromZodError(error));
      }

      throw new BadRequestException('Validation failed');
    }
  }
}
