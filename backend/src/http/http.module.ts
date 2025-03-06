import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CreateTaskController } from './controllers/task/create-task.controller';
import { CreateTaskService } from 'src/services/task/create-task.service';
import { DeleteTaskController } from './controllers/task/delete-task-by-id.controller';
import { DeleteTaskService } from 'src/services/task/delete-task.service';
import { ListTasksByUserIdController } from './controllers/task/list-tasks-by-user-id.controller';
import { ListTasksByUserIdService } from 'src/services/task/list-tasks.service';
import { UpdateTaskController } from './controllers/task/update-task.controller';
import { UpdateTaskService } from 'src/services/task/update-task.service';
import { CreateUserController } from './controllers/user/create-user.controller';
import { CreateUserService } from 'src/services/user/create-user.service';
import { GetUserByIdController } from './controllers/user/get-user-by-id.controller';
import { GetUserByIdService } from 'src/services/user/get-user-by-id.service';
import { AuthController } from './controllers/auth/login.controller';
import { AuthService } from 'src/services/auth/auth-service';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateTaskController,
    DeleteTaskController,
    ListTasksByUserIdController,
    UpdateTaskController,
    CreateUserController,
    GetUserByIdController,
    AuthController,
  ],
  providers: [
    CreateTaskService,
    DeleteTaskService,
    ListTasksByUserIdService,
    UpdateTaskService,
    CreateUserService,
    GetUserByIdService,
    AuthService,
  ],
})
export class HttpModule {}
