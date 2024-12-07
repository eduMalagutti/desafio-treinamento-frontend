import { Controller, Get, HttpCode } from '@nestjs/common';
import { ListTasksService } from '../../services/list-tasks.service';

@Controller('/tasks')
export class ListTasksController {
  constructor(private listTasksService: ListTasksService) {}

  @Get()
  @HttpCode(200)
  async handle() {
    const { tasks } = await this.listTasksService.execute();

    return tasks;
  }
}
