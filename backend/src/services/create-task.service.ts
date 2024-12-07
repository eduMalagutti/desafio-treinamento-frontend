import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { TasksRepository } from '../database/contracts/contract-tasks-repository';
import { ResourceAlreadyExistsError } from './errors/resource-already-exists-error';

type CreateTaskServiceRequest = {
  name: string;
  description: string;
};

type CreateTaskServiceResponse = {
  task: Task;
};

@Injectable()
export class CreateTaskService {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    name,
    description,
  }: CreateTaskServiceRequest): Promise<CreateTaskServiceResponse> {
    const taskWithSameName = await this.tasksRepository.findByName(name);
    if (taskWithSameName) {
      throw new ResourceAlreadyExistsError('Task');
    }

    const task = await this.tasksRepository.create({
      name,
      description,
    });

    return {
      task,
    };
  }
}
