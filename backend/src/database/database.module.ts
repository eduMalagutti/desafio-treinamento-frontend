import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaTasksRepository } from './prisma/repositories/prisma-tasks-repository';
import { TasksRepository } from './contracts/contract-tasks-repository';

@Module({
  providers: [
    PrismaService,
    { provide: TasksRepository, useClass: PrismaTasksRepository },
  ],
  exports: [PrismaService, TasksRepository],
})
export class DatabaseModule {}
