import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from 'src/database/contracts/contract-users-repository';
import { UnauthorizedError } from '../errors/unauthorized-error';

type AuthServiceRequest = {
  email: string;
  password: string;
};

type AuthServiceResponse = {
  token: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async authenticateUser(
    request: AuthServiceRequest,
  ): Promise<AuthServiceResponse> {
    const user = await this.usersRepository.findByEmail(request.email);
    if (!user) {
      throw new UnauthorizedError();
    }

    const isPasswordValid = await bcrypt.compare(
      request.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedError();
    }

    const payload = { sub: user.id };
    const token = await this.jwtService.signAsync(payload);
    
    return { token };
  }
}
