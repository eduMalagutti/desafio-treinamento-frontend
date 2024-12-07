import { Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { TasksRepository } from '../database/contracts/contract-tasks-repository';

type DeleteTaskServiceRequest = {
  id: string;
};

@Injectable()
export class DeleteTaskService {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({ id }: DeleteTaskServiceRequest): Promise<void> {
    const task = await this.tasksRepository.findById(id);
    if (!task) {
      throw new ResourceNotFoundError('Task');
    }

    await this.tasksRepository.delete(id);
  }
}
