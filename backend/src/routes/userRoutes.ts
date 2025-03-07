import { FastifyInstance } from 'fastify'
import { $ref } from '../schemas/user.schemas.js';
import { createUser, getUsers, login, logout, getMe } from '../controllers/user.controller.js';

export default async function userRoutes(fastify: FastifyInstance) {

  fastify.get(
    '/',
    {
      preHandler: [fastify.authenticate],
    },
    getUsers,
  );

  fastify.get(
    '/me',
    {
      preHandler: [fastify.authenticate],
    },
    getMe,
  );

  fastify.post(
    '/register',
    {
      schema: {
        body: $ref('createUserSchema'),
        response: {
          201: $ref('createUserResponseSchema'),
        },
      },
    },
    createUser,
  );

  fastify.post(
    '/login',
    {
      schema: {
        body: $ref('loginSchema'),
        response: {
          201: $ref('loginResponseSchema'),
        },
      },
    },
    login,
  );

  fastify.delete('/logout', { preHandler: [fastify.authenticate] }, logout);
};