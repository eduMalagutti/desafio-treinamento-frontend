import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/database/contracts/contract-users-repository';
import { ResourceAlreadyExistsError } from '../errors/resource-already-exists-error';
import * as bcrypt from 'bcrypt';

type CreateUserServiceRequest = {
  name: string;
  email: string;
  password: string;
};

type CreateUserServiceResponse = {
  id: string;
  name: string;
  email: string;
};

@Injectable()
export class CreateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: CreateUserServiceRequest): Promise<CreateUserServiceResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);
    if (userWithSameEmail) {
      throw new ResourceAlreadyExistsError('Users email');
    }

    const saltRounds = 10;
    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersRepository.create({
      name,
      email,
      password: encryptedPassword,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
