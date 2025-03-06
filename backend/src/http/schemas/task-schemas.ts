import { z } from 'zod';

export const createTaskBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  userId: z.string().uuid(),
});

export const updateTaskParamSchema = z.object({
  id: z.string().uuid(),
});

export const updateTaskBodySchema = z.object({
  isFinished: z.boolean(),
});

export const deleteTaskParamSchema = z.object({
  id: z.string().uuid(),
});

export const getTaskByIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const listTasksByUserIdParamSchema = z.object({
  userId: z.string().uuid(),
})

export type CreateTaskBodySchema = z.infer<typeof createTaskBodySchema>;
export type UpdateTaskParamSchema = z.infer<typeof updateTaskParamSchema>;
export type UpdateTaskBodySchema = z.infer<typeof updateTaskBodySchema>;
export type DeleteTaskParamSchema = z.infer<typeof deleteTaskParamSchema>;
export type GetTaskByIdParamSchema = z.infer<typeof getTaskByIdParamSchema>;
export type ListTasksByUserIdParamSchema = z.infer<typeof listTasksByUserIdParamSchema>;
