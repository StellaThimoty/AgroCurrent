import { z } from 'zod'
import type { User } from 'src/lib/types';
import {compare} from 'bcrypt-ts'

const UserSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: "Insira um email válido" }),
  password: z.string().min(6, { message: "A senha tem que ter mais que 6 caracteres"}),
  passwordConfirm: z.string().min(6),
  category: z.enum(['Administrador', 'Consultor', 'Registrador'], {
    invalid_type_error: 'Selecione uma categoria válida',
  }),
}).superRefine(({passwordConfirm, password}, ctx) => {
  if (passwordConfirm !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match"
    })
  }
})

async function getUser(email: string, password:string){
  const data = {
    email: email,
    password: password,
  }
  try {
    const user = await fetch('http://localhost:3001/auth/login', {
      method: "POST",
      body: data.toString()
    });
    const ret = await user.json()
    return ret
  } catch (error) {
    console.error("Falha em achar usuário: ", error)
    throw new Error("Falha em achar o usuário")
  }
}

export async function login(email: string, password: string): Promise<User | undefined> {
  const parsedCredentials = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  }).safeParse({email, password});
  if(parsedCredentials.success)
  try {
    const { email, password} = parsedCredentials.data
    const user = await getUser(email, password)
    if (!user) return undefined
    const passwordMatch = await compare(password, user.password)
    if(passwordMatch) return user
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function createUser(formData: FormData): Promise<User> {
  const validatedFields = UserSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    passwordConfirm: formData.get('passwordConfirm'),
    category: formData.get('category')
  })

  // if(!validatedFields.success){
  //   return {
  //     errors: validatedFields.error.flatten().fieldErrors,
  //     message: 'Preencha os campos corretamente',
  //   }
  // }
  const data = validatedFields.data
  try {
    const dupl = await fetch('http://localhost:3001/auth/login', {
      method: "POST",
      body: data.toString()
    });
    const ret = await dupl.json()
    console.log(ret)
    return ret //change this later
  } catch (error) {
    console.error("Falha em achar usuário: ", error)
    throw new Error("Falha em achar o usuário")
  }
}

