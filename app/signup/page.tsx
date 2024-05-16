import JohnLogo from '@/app/ui/john-logo';
import SignupForm from '../ui/signup-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cadastro'
}


export default function SignupPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-green-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <JohnLogo />
          </div>
        </div>
        <SignupForm />
      </div>
    </main>
  );
}