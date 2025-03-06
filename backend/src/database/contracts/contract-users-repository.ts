import { User } from "@prisma/client";

export type CreateUser = {
  name: string;
  email: string;
  password: string;
}

export abstract class UsersRepository {
  abstract create(data: CreateUser): Promise<User>
  abstract findByEmail(email: string): Promise<User | null>
  abstract findById(id: string): Promise<User | null>
}
