import { Body, Controller, HttpCode, Param, Put } from "@nestjs/common";
import { ZodValidationPipe } from "src/http/pipes/zod-validation-pipe";
import { UpdateTaskBodySchema, updateTaskBodySchema, UpdateTaskParamSchema, updateTaskParamSchema } from "src/http/schemas/task-schemas";
import { UpdateTaskService } from "src/services/task/update-task.service";

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
