import HeaderHome from '@/components/layout/header/headerHome';
import SignupForm from '@/components/layout/userforms/signupForm'
// import { isAdm } from '@/lib/utils';

export default function SignupPage() {
  // const cargo = document.cookie.split("; ").filter(row => row.startsWith('category=')).map(cookie => cookie.split('=')[1])[0]

  return (
        <>
            <HeaderHome pagename="Cadastro"/>
            <SignupForm />
        </>

  );
}