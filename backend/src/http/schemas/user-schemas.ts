import { z } from "zod";

export const createUserBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

export const getUserByIdParamSchema = z.object({
  id: z.string().uuid(),
})

export type CreateUserBodySchema = z.infer<typeof createUserBodySchema>
export type GetUserByIdParamSchema = z.infer<typeof getUserByIdParamSchema>

export type UserControllerResponse = {
  id: string
  name: string
  email: string
}
