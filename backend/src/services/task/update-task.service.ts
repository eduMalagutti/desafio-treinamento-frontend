import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from '@prisma/client';
import { TasksRepository } from '../../database/contracts/contract-tasks-repository';

type UpdateTaskServiceRequest = {
  id: string;
  isFinished: boolean;
};

type UpdateTaskServiceResponse = {
  task: Task;
};

@Injectable()
export class UpdateTaskService {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    id,
    isFinished,
  }: UpdateTaskServiceRequest): Promise<UpdateTaskServiceResponse> {
    const task = await this.tasksRepository.findById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const updatedTask = await this.tasksRepository.update({
      id,
      finishedAt: isFinished ? new Date() : null,
    });

    return {
      task: updatedTask,
    };
  }
}
