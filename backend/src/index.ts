import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import cors from "@fastify/cors";
import dotenv from 'dotenv';
import fjwt, { FastifyJWT } from '@fastify/jwt'
import fCookie from '@fastify/cookie'
import userRoutes from './routes/userRoutes.js';
import { userSchemas } from './schemas/user.schemas.js';

dotenv.config();

const fastify = Fastify({ logger: true });

fastify.register(cors, {
  origin: process.env.FRONTEND_BASE_URL, // Replace with your Vue app URL
  credentials: true, // Allow credentials (cookies) to be sent
});
fastify.register(fjwt, { secret: process.env.JWT_SECRET ?? "" });
fastify.register(userRoutes, { prefix: '/api/users'});

fastify.addHook('preHandler', (req, res, next) => {
  // here we are
  req.jwt = fastify.jwt
  return next()
});

fastify.register(fCookie, {
  secret: 'some-secret-key',
  hook: 'preHandler',
})

for (let schema of [...userSchemas]) {
  fastify.addSchema(schema)
}

const listeners = ['SIGINT', 'SIGTERM']
listeners.forEach((signal) => {
  process.on(signal, async () => {
    await fastify.close()
    process.exit(0)
  })
});

fastify.decorate(
  'authenticate',
  async (req: FastifyRequest, reply: FastifyReply) => {
    const token = req.cookies.access_token

    if (!token) {
      return reply.status(401).send({ message: 'Authentication required' })
    }
    // here decoded will be a different type by default but we want it to be of user-payload type
    const decoded = req.jwt.verify<FastifyJWT['user']>(token)
    req.user = decoded
  },
)

// Lancer le serveur
const start = async () => {
  try {
    const PORT = Number(process.env.PORT) || 5000;
    await fastify.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
  } catch (err) {
    fastify.log.error("Error :",err);
    process.exit(1);
  }
};

start();
