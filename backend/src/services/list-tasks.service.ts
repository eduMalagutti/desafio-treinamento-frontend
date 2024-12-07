import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { TasksRepository } from '../database/contracts/contract-tasks-repository';

type ListTasksServiceResponse = {
  tasks: Task[];
};

@Injectable()
export class ListTasksService {
  constructor(private tasksRepository: TasksRepository) {}

  async execute(): Promise<ListTasksServiceResponse> {
    const tasks = await this.tasksRepository.findMany();

    return {
      tasks,
    };
  }
}
