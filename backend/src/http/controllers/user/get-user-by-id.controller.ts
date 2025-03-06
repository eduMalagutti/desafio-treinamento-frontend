import { Controller, Get, HttpCode, Param, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/http/pipes/zod-validation-pipe';
import {
  getUserByIdParamSchema,
  GetUserByIdParamSchema,
  UserControllerResponse,
} from 'src/http/schemas/user-schemas';
import { GetUserByIdService } from 'src/services/user/get-user-by-id.service';

@Controller('/users/:id')
export class GetUserByIdController {
  constructor(private getUserByIdService: GetUserByIdService) {}

  @Get()
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(getUserByIdParamSchema))
  async handle(@Param() { id }: GetUserByIdParamSchema) : Promise<UserControllerResponse>{
    const response = await this.getUserByIdService.execute({ id });

    return {
      id: response.id,
      name: response.name,
      email: response.email,
    };
  }
}
