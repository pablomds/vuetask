import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateTodoInput, UpdateTodoInput } from '../schemas/todo.schemas.js';
import supabase from '../config/supabase.js';

export async function createTodo(
    req: FastifyRequest<{
      Body: CreateTodoInput;
    }>,
    reply: FastifyReply
  ) {
    const { task } = req.body;

    const created_by = (req.user as { id: string })?.id;
    
    const { data: todo, error } = await supabase
      .from("todos")
      .insert([
        {
          task,
          created_by,
        },
      ])
      .select("*")
      .single();

    if (error) return reply.code(500).send(error);
  
    return reply.code(201).send(todo);
};

export async function updateTodo(
  req: FastifyRequest<{
    Body: UpdateTodoInput;
  }>,
  reply: FastifyReply
) {
  const { task, id, is_finished } = req.body;

  const { error } = await supabase.from("todos").update({ task, is_finished }).eq('id', id);

  if (error) reply.code(500).send(error);

  return reply.code(200).send({ message: "success"});

};

export async function getTodos(
  req: FastifyRequest, 
  reply: FastifyReply
) {

  const { data: todos, error} = await supabase.from("todos").select("*");

  if (error) return reply.status(500).send(error)
  
  return reply.code(200).send(todos);
};

export async function getUserTodos(
  req: FastifyRequest, 
  reply: FastifyReply
) {

  const createdBy = (req.user as { id: string })?.id;

  const { data: todos, error } = await supabase
    .from("todos")
    .select("*")
    .eq("created_by", createdBy);

  if (error) return reply.status(500).send(error);

  return reply.status(200).send(todos || []);
};
