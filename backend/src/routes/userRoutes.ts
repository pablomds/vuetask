import supabase from '../config/supabase.ts';

export default async function userRoutes(fastify, options) {
  fastify.get('/users', async (request, reply) => {
    const { data, error } = await supabase.from('users').select('*');
    if (error) return reply.status(500).send(error);
    return data;
  });
}
