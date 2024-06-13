import HeaderHome from '@/components/layout/header/headerHome';
import SignupForm from '@/components/layout/userforms/signupForm'

export default function SignupPage() {
  return (
    <>
      <HeaderHome pagename="Cadastro"/>
      <SignupForm />
    </>
  );
}