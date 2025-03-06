import { CreateUser, UsersRepository } from "src/database/contracts/contract-users-repository";
import { Injectable } from '@nestjs/common';
import { User } from "@prisma/client";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreateUser): Promise<User> {
    return this.prismaService.user.create({ data });
  }

  async findById(id: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }
}
