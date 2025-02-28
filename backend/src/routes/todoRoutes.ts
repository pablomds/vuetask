import { FastifyInstance } from 'fastify'
import { createTodo, getTodos, updateTodo, deleteTodo, getUserTodos } from '../controllers/todo.controller.js';


export default async function todoRoutes(fastify: FastifyInstance) {

  fastify.get(
    '/all',
    {
      preHandler: [fastify.authenticate],
    },
    getTodos
  );

  fastify.get(
    '/',
    {
      preHandler: [fastify.authenticate],
    },
    getUserTodos
  );

  fastify.patch(
    '/update',
    {
      preHandler: [fastify.authenticate],
    },
    updateTodo
  );

  fastify.delete(
    '/',
    {
      preHandler: [fastify.authenticate],
    },
    deleteTodo
  );

  fastify.post(
    '/',
    {
      preHandler: [fastify.authenticate],
    },
    createTodo,
  );

};