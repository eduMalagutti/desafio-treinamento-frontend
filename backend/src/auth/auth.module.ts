import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Env } from '@/env';
import { JwtStrategy } from '@/auth/jwt-strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory(config: ConfigService<Env, true>) {
        const secret = config.get('JWT_SECRET', { infer: true });

        return {
          signOptions: { algorithm: 'HS256', expiresIn: '7d' },
          secret: secret,
        };
      },
    }),
  ],
  providers: [JwtStrategy],
})
export class AuthModule {}
