import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Task } from '@prisma/client';
import {
  CreateTask,
  TasksRepository,
  UpdateTask,
} from '../../contracts/contract-tasks-repository';

@Injectable()
export class PrismaTasksRepository implements TasksRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreateTask): Promise<Task> {
    return this.prismaService.task.create({ data });
  }

  async update(data: UpdateTask): Promise<Task> {
    return this.prismaService.task.update({
      where: { id: data.id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.task.delete({
      where: { id },
    });
  }

  async findById(id: string): Promise<Task | null> {
    return this.prismaService.task.findUnique({
      where: { id },
    });
  }

  async findByName(name: string): Promise<Task | null> {
    return await this.prismaService.task.findUnique({
      where: { name },
    });
  }

  async findMany(): Promise<Task[]> {
    return await this.prismaService.task.findMany();
  }
}
