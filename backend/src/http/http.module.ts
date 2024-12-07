import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CreateTaskController } from './controllers/create-task.controller';
import { CreateTaskService } from 'src/services/create-task.service';
import { DeleteTaskController } from './controllers/delete-task-by-id.controller';
import { DeleteTaskService } from 'src/services/delete-task.service';
import { ListTasksController } from './controllers/list-tasks.controller';
import { ListTasksService } from 'src/services/list-tasks.service';
import { UpdateTaskController } from './controllers/update-task.controller';
import { UpdateTaskService } from 'src/services/update-task.service';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateTaskController,
    DeleteTaskController,
    ListTasksController,
    UpdateTaskController,
  ],
  providers: [
    CreateTaskService,
    DeleteTaskService,
    ListTasksService,
    UpdateTaskService,
  ],
})
export class HttpModule {}
