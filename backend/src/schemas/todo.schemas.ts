import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const createTodoSchema = z.object({
    task: z.string(),
    created_by: z.string()
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>;

const updateTodoSchema = z.object({
  id: z.string(),
  task: z.string(),
  created_by: z.string(),
  is_finished: z.boolean().default(false)
});

export type UpdateTodoInput =  z.infer<typeof updateTodoSchema>;

export const { schemas: todoSchemas, $ref } = buildJsonSchemas({
  createTodoSchema,
  updateTodoSchema
});