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

const deleteTodoSchema = z.object({
  id: z.number()
});

export type DeleteTodoInput = z.infer<typeof deleteTodoSchema>;

export const { schemas: todoSchemas, $ref } = buildJsonSchemas({
  createTodoSchema,
  updateTodoSchema,
  deleteTodoSchema
});
