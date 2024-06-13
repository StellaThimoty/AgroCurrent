import HeaderHome from '@/components/layout/header/headerHome';
import LoginForm from '@/components/layout/userforms/loginForm'

export default function LoginPage() {
  return (
    <>
      <HeaderHome pagename="Entrar"/>
        <LoginForm />
    </>
  );
}