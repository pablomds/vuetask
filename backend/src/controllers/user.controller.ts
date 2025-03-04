import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserInput, LoginUserInput  } from '../schemas/user.schemas.js';
import supabase from '../config/supabase.js';
import bcrypt from 'bcryptjs';


const SALT_ROUNDS = 10;

export async function createUser(
  req: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply
) {
  const { password, email, name } = req.body;
  const { data: currentUser } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .limit(1)
    .single();
  if (currentUser) {
    return reply.code(401).send({
      message: "User already exists with this email",
    });
  }

  const hash = await bcrypt.hash(password, SALT_ROUNDS);

  const { data: user, error } = await supabase
    .from("users")
    .insert([
      {
        password: hash,
        email,
        name,
      },
    ])
    .select("*").single();

  if (error) return reply.code(500).send(error);

  return reply.code(201).send(user);
};

export async function login(
    req: FastifyRequest<{
      Body: LoginUserInput
    }>,
    reply: FastifyReply,
  ) {
    const { email, password } = req.body
  
    const {data: user} = await supabase.from("users").select("*").eq("email", email).limit(1).single();
  
    const isMatch = user && (await bcrypt.compare(password, user.password))
    if (!user || !isMatch) {
      return reply.code(401).send({
        message: 'Invalid email or password',
      })
    }
  
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    }
    const token = req.jwt.sign(payload)

  
    reply.setCookie('access_token', token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      expires: new Date(Date.now() + 86400 * 1000),
      domain: process.env.NODE_ENV === 'production' ? '.vuetask.onrender.com' : undefined
    })
  
    return { accessToken: token }
};

export async function getUsers(req: FastifyRequest, reply: FastifyReply) {
  const {data:users, error} = await supabase.from("users").select("*");
  if (error) return reply.status(500).send(error);
  return reply.code(200).send(users)
};

export async function logout(req: FastifyRequest, reply: FastifyReply) {
  reply.clearCookie('access_token')
  return reply.send({ message: 'Logout successful' })
};

export async function getMe(req: FastifyRequest, reply: FastifyReply) {
  return reply.send(req.user);
};