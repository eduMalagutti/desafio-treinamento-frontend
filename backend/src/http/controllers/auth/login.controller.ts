import { Public } from '@/auth/decorators/public.decorator';
import { Controller, Post, Body, UsePipes, HttpCode } from '@nestjs/common';
import { ZodValidationPipe } from 'src/http/pipes/zod-validation-pipe';
import { loginBodySchema, LoginBodySchema } from 'src/http/schemas/auth-schemas';
import { AuthService } from 'src/services/auth/auth-service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post()
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(loginBodySchema))
  async login(
    @Body() requestbody: LoginBodySchema,
  ) {
    const response = await this.authService.authenticateUser({
      email: requestbody.email,
      password: requestbody.password,
    });

    return {
      token: response.token,
    };
  }
}
