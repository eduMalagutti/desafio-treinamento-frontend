import { Public } from '@/auth/decorators/public.decorator';
import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/http/pipes/zod-validation-pipe';
import {
  CreateUserBodySchema,
  createUserBodySchema,
  UserDTO,
} from 'src/http/schemas/user-schemas';
import { CreateUserService } from 'src/services/user/create-user.service';

@Controller('/users')
export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}

  @Public()
  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createUserBodySchema))
  async handle(
    @Body()
    { name, email, password }: CreateUserBodySchema,
  ): Promise<UserDTO> {
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
