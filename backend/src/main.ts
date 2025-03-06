import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { Env } from './env';
import { ErrorHandler } from './error-handler';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const configService = app.get<ConfigService<Env, true>>(ConfigService);
  const port = configService.get('API_PORT', { infer: true });

  app.useGlobalFilters(new ErrorHandler());
  app.useGlobalGuards(new JwtAuthGuard(new Reflector));

  await app.listen(port);
}
bootstrap();
