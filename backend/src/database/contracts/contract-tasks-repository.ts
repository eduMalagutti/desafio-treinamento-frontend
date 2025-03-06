import { Task } from '@prisma/client';

export type CreateTask = {
  name: string;
  description: string;
  userId: string;
};

export type UpdateTask = {
  id: string;
  finishedAt: Date;
};

export abstract class TasksRepository {
  abstract create: (data: CreateTask) => Promise<Task>;
  abstract update: (data: UpdateTask) => Promise<Task>;
  abstract delete(id: string): Promise<void>;
  abstract findById: (id: string) => Promise<Task | null>;
  abstract findByName: (name: string) => Promise<Task | null>;
  abstract findMany: (userId: string) => Promise<Task[]>;
}
