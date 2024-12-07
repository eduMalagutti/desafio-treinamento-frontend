import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { CreateTaskService } from '../../services/create-task.service';
import {
  CreateTaskBodySchema,
  createTaskBodySchema,
} from '../schemas/task-schemas';

@Controller('/tasks')
export class CreateTaskController {
  constructor(private createTaskService: CreateTaskService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createTaskBodySchema))
  async handle(
    @Body()
    { name, description }: CreateTaskBodySchema,
  ) {
    const { task } = await this.createTaskService.execute({
      name,
      description,
    });

    return task;
  }
}
