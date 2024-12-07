import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { Env } from './env';
import { ErrorHandler } from './error-handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const configService = app.get<ConfigService<Env, true>>(ConfigService);
  const port = configService.get('API_PORT', { infer: true });

  app.useGlobalFilters(new ErrorHandler());

  await app.listen(port);
}
bootstrap();
