import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { TasksRepository } from '../../database/contracts/contract-tasks-repository';

type ListTasksByUserIdServiceRequest = {
  userId: string;
};

type ListTasksByUserIdServiceResponse = {
  tasks: Task[];
};

@Injectable()
export class ListTasksByUserIdService {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    userId,
  }: ListTasksByUserIdServiceRequest): Promise<ListTasksByUserIdServiceResponse> {
    const tasks = await this.tasksRepository.findMany(userId);

    return {
      tasks,
    };
  }
}
