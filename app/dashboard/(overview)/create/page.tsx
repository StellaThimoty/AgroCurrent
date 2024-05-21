import SignupForm from '../../../ui/signup-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cadastro'
}
export default function SignupPage() {
  return (
        <SignupForm />
  );
}