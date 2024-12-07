import { Controller, Delete, Param, HttpCode } from '@nestjs/common';
import { DeleteTaskService } from '../../services/delete-task.service';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import {
  DeleteTaskParamSchema,
  deleteTaskParamSchema,
} from '../schemas/task-schemas';

const paramValidationPipe = new ZodValidationPipe(deleteTaskParamSchema);

@Controller('/tasks/:id')
export class DeleteTaskController {
  constructor(private deleteTaskService: DeleteTaskService) {}

  @Delete()
  @HttpCode(200)
  async handle(@Param(paramValidationPipe) { id }: DeleteTaskParamSchema) {
    await this.deleteTaskService.execute({ id });

    return {
      message: 'Task deleted successfully',
    };
  }
}
