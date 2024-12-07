import { z } from 'zod';

const createTaskBodySchema = z.object({
  name: z.string(),
  description: z.string(),
});

const updateTaskParamSchema = z.object({
  id: z.string().uuid(),
});

const updateTaskBodySchema = z.object({
  isFinished: z.boolean(),
});

const deleteTaskParamSchema = z.object({
  id: z.string().uuid(),
});

const getTaskByIdParamSchema = z.object({
  id: z.string().uuid(),
});

type CreateTaskBodySchema = z.infer<typeof createTaskBodySchema>;
type UpdateTaskParamSchema = z.infer<typeof updateTaskParamSchema>;
type UpdateTaskBodySchema = z.infer<typeof updateTaskBodySchema>;
type DeleteTaskParamSchema = z.infer<typeof deleteTaskParamSchema>;
type GetTaskByIdParamSchema = z.infer<typeof getTaskByIdParamSchema>;

export {
  createTaskBodySchema,
  updateTaskParamSchema,
  updateTaskBodySchema,
  deleteTaskParamSchema,
  getTaskByIdParamSchema,
  CreateTaskBodySchema,
  UpdateTaskParamSchema,
  UpdateTaskBodySchema,
  DeleteTaskParamSchema,
  GetTaskByIdParamSchema,
};
