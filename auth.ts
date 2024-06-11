import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod'
// import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';

async function getUser(email: string, password: string): Promise<User | undefined> {
  const data = {
    email: email,
    password: password,
  }
  try {
    // const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    const user = await fetch('http://localhost:3001/auth/login', {
      method: "POST",
      body: data.toString()
    });
    const ret = await user.json()
    console.log(ret)
    return ret
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      id: "agro-current",
      name: "Agro Current",
    async authorize(credentials) {
      const parsedCredentials = z.object({
        email: z.string().email(),
        password: z.string().min(6)
      }).safeParse(credentials);
      if (parsedCredentials.success) {
        const { email, password } = parsedCredentials.data
        const user = await getUser(email, password);
        if (!user) return null
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (passwordsMatch) return user
      }
      console.log('Invalid credentials')
      return null
    },
  })
]
});