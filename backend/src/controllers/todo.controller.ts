import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateTodoInput, UpdateTodoInput, DeleteTodoInput } from '../schemas/todo.schemas.js';
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
  
    return reply.code(201).send({ id: todo.id });
};

export async function updateTodo(
  req: FastifyRequest<{
    Body: UpdateTodoInput;
  }>,
  reply: FastifyReply
) {
  const { task, id, is_finished } = req.body;
  const currentUserId = req.user.id;

  const { data, error } = await supabase.from("todos").update({ task, is_finished }).eq('created_by', currentUserId).eq('id', id).select().single();

  if (error) {
    if (error.message.includes("no rows updated")) {
      return reply.code(403).send({ message: "You are not authorized to update this todo" });
    }
    return reply.code(500).send({ message: "Error updating todo item", error });
  }
  
  if (!data) {
    return reply.code(404).send({ message: "Todo not found or already updated" });
  }

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

export async function deleteTodo(
  req: FastifyRequest<{
    Body: DeleteTodoInput;
  }>,
  reply: FastifyReply
) {
  const { id } = req.body;
  const currentUserId = req.user.id;

  const { data: todo, error: fetchError } = await supabase
    .from("todos")
    .select("*")
    .eq('id', id)
    .eq('created_by', currentUserId)
    .single(); 


  if (fetchError || !todo) {
    return reply.code(404).send({ message: "Todo item not found or you are not authorized to delete it" });
  }

  const { error } = await supabase
    .from("todos")
    .delete()
    .eq('id', id)
    .eq('created_by', currentUserId);

  if (error) {
    if (error.message.includes("no rows deleted")) {
      return reply.code(403).send({ message: "You are not authorized to delete this todo" });
    }
    return reply.code(500).send({ message: "Error deleting todo item", error });
  }

  return reply.code(204).send({ message: "Success" });
}


export async function getUserTodos(
  req: FastifyRequest, 
  reply: FastifyReply
) {

  const user = req.user as { id: string };
  if (!user || !user.id) {
    return reply.status(400).send({ message: "User ID is missing or invalid" });
  }

  const createdBy = user.id;

  const { data: todos, error } = await supabase
    .from("todos")
    .select("*")
    .eq("created_by", createdBy);

  if (error) return reply.status(500).send(error);

  return reply.status(200).send(todos || []);
};
