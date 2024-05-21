import BaseLayout from '../ui/base-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cadastro'
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
  <body>
      <BaseLayout pagename={metadata.title as string}>{children}</BaseLayout>
  </body>
  );
}