'use server'
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { hash } from 'bcrypt';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer',
  }),
  amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status',
  }),
  date: z.string(),
})

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

export type UserState = {
  errors?: {
    password?: string[];
    category?: string[];
  };
  message?: string | null;
}

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

const CreateInvoice = FormSchema.omit({ id: true, date: true })
const UpdateInvoice = FormSchema.omit({ id: true, date: true });
const CreateUser = UserSchema

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Credenciais inválidas. Corrija e tente novamente.';      
        default:
          return 'Algo deu errado. Aguarde e tente novamente.';
      }
    }
    throw error
  }
}

export async function createUser(prevState: UserState, formData: FormData): Promise<UserState> {
  const validatedFields = CreateUser.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    passwordConfirm: formData.get('passwordConfirm'),
    category: formData.get('category')
  })

  if(!validatedFields.success){
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Preencha os campos corretamente',
    }
  }

  const { name, email, password, category } = validatedFields.data
  try {
    const dupl = await sql`SELECT * FROM users WHERE email LIKE ${email}`
    if (dupl.rowCount > 0)
      return {
        errors: {},
        message: "Usuário já existe. Apenas um e-mail por usuário é permitido"
    }
    const hashedPassword = await hash(password, 10);
    await sql`
  INSERT INTO users (name, email, password, category)
  VALUES (${name}, ${email}, ${hashedPassword}, ${category})`;
  } catch (error) {
    return {
      errors: {},
      message: 'Database Error: Falha em criar usuário'
    }
  }

  revalidatePath('/signup');
  redirect('/dashboard')
}

export async function createInvoice(prevState: State, formData: FormData) {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    }
  }

  const { customerId, amount, status } = validatedFields.data
  const amountInCents = amount * 100
  const date = new Date().toISOString().split('T')[0]

    try {
      await sql`
  INSERT INTO invoices (customer_id, amount, status, date)
  VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
`;
    } catch (error) {
      return {
        message: 'Database Error: Failed to Create Invoice'
      }
    }
  

  revalidatePath('/dashboard/invoices')
  redirect('/dashboard/invoices')
}

export async function updateInvoice(id: string, prevState: State, formData: FormData) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice'
    }
  }
 
  const { customerId, amount, status } = validatedFields.data
  const amountInCents = amount * 100;
 
  try {
    await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `; 
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Invoice'
    }
  }
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice'}
  } catch (error) {
    return {
      message: 'Database Error: Failed to Delete Invoice'
    }
  }
}