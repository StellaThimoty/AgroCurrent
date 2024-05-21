import '@/app/ui/global.css'
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: {
    template: '%s | PI John Deere',
    default: 'PI John Deere',
},
  description: 'Aplicativo web de vistoria feito como projeto integrado da Fatec - Indaiatuba',
  metadataBase: new URL('https://fatecid.com.br/cursos/')
}

// NÃO PASSAR O COMPONENTE BASE LAYOUT 
// FICA BUGADO E MUITO FEIO
// DEIXA DO JEITO QUE ESTÁ

export default function RootLayout({children}: {children: React.ReactNode;}) {
  return (
  <html>
    {children}
  </html>
  );
}
