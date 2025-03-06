import { Controller, Get, HttpCode, Param, UsePipes } from '@nestjs/common';
import { ListTasksByUserIdService } from '../../../services/task/list-tasks.service';
import { ZodValidationPipe } from 'src/http/pipes/zod-validation-pipe';
import {
  ListTasksByUserIdParamSchema,
  listTasksByUserIdParamSchema,
} from 'src/http/schemas/task-schemas';

@Controller('/tasks/:userId')
export class ListTasksByUserIdController {
  constructor(private listTasksByUserIdService: ListTasksByUserIdService) {}

  @Get()
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(listTasksByUserIdParamSchema))
  async handle(@Param() { userId }: ListTasksByUserIdParamSchema) {
    const { tasks } = await this.listTasksByUserIdService.execute({ userId });

    return tasks;
  }
}
