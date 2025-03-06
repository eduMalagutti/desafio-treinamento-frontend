import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { UsersRepository } from "src/database/contracts/contract-users-repository";
import { ResourceAlreadyExistsError } from "../errors/resource-already-exists-error";

type CreateUserServiceRequest = {
  name: string;
  email: string;
  password: string
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
    password
  }: CreateUserServiceRequest): Promise<CreateUserServiceResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);
    if (userWithSameEmail) {
      throw new ResourceAlreadyExistsError('Users email');
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email
    };
  }
}
