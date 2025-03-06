import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/database/contracts/contract-users-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

type GetUserByIdServiceRequest = {
  id: string;
};

type GetUserResponse = {
  id: string;
  name: string;
  email: string;
};

@Injectable()
export class GetUserByIdService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id }: GetUserByIdServiceRequest): Promise<GetUserResponse> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new ResourceNotFoundError('User');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
