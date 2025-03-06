import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/http/pipes/zod-validation-pipe';
import {
  CreateUserBodySchema,
  createUserBodySchema,
  UserControllerResponse,
} from 'src/http/schemas/user-schemas';
import { CreateUserService } from 'src/services/user/create-user.service';

@Controller('/users')
export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createUserBodySchema))
  async handle(
    @Body()
    { name, email, password }: CreateUserBodySchema,
  ): Promise<UserControllerResponse> {
    const response = await this.createUserService.execute({
      name,
      email,
      password,
    });

    return {
      id: response.id,
      name: response.name,
      email: response.email,
    };
  }
}
