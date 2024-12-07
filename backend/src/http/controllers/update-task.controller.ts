import { Body, Controller, HttpCode, Param, Put } from '@nestjs/common';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { UpdateTaskService } from '../../services/update-task.service';
import {
  UpdateTaskParamSchema,
  UpdateTaskBodySchema,
  updateTaskParamSchema,
  updateTaskBodySchema,
} from '../schemas/task-schemas';

const paramValidationPipe = new ZodValidationPipe(updateTaskParamSchema);
const bodyValidationPipe = new ZodValidationPipe(updateTaskBodySchema);

@Controller('/tasks/:id')
export class UpdateTaskController {
  constructor(private updateTaskService: UpdateTaskService) {}

  @Put()
  @HttpCode(200)
  async handle(
    @Param(paramValidationPipe) { id }: UpdateTaskParamSchema,
    @Body(bodyValidationPipe) { isFinished }: UpdateTaskBodySchema,
  ) {
    const { task } = await this.updateTaskService.execute({
      id,
      isFinished,
    });

    return task;
  }
}
