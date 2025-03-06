import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaTasksRepository } from './prisma/repositories/prisma-tasks-repository';
import { TasksRepository } from './contracts/contract-tasks-repository';
import { UsersRepository } from './contracts/contract-users-repository';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository';

@Module({
  providers: [
    PrismaService,
    { provide: TasksRepository, useClass: PrismaTasksRepository },
    { provide: UsersRepository, useClass: PrismaUsersRepository },
  ],
  exports: [PrismaService, TasksRepository, UsersRepository],
})
export class DatabaseModule {}
