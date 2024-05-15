import '@/app/ui/global.css'
import {inter} from '@/app/ui/fonts'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | PI John Deere',
    default: 'PI John Deere',
},
  description: 'Aplicativo web de vistoria feito como projeto integrado da Fatec - Indaiatuba',
  metadataBase: new URL('https://fatecid.com.br/cursos/')
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
