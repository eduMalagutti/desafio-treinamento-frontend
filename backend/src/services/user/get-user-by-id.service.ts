import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { UsersRepository } from "src/database/contracts/contract-users-repository";
import { ResourceAlreadyExistsError } from "../errors/resource-already-exists-error";

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

  async execute({
    id
  }: GetUserByIdServiceRequest): Promise<GetUserResponse> {
    const user = await this.usersRepository.findById(id);

    return {
      id: user.id,
      name: user.name,
      email: user.email
    };
  }
}
