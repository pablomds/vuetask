import Fastify from 'fastify';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.ts';

const fastify = Fastify({ logger: true });

fastify.register(userRoutes);

fastify.listen({ port: 3000, host: '0.0.0.0' });
