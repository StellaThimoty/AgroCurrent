import CardWrapper from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { fetchCardData } from '@/app/lib/data';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Suspense } from 'react'
import { LatestInvoicesSkeleton, RevenueChartSkeleton, CardsSkeleton } from '@/app/ui/skeletons';
 
export default async function Page() {
  // const cardData = await fetchCardData()
  return (
    <main>
      <h1 className='flex flex-row mb-4 text-xl md:text-2xl'>Usuários</h1>
      <Link href="/singup" className="flex items-center gap-5 self-start rounded-lg bg-green-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-green-400 md:text-base">
        <span>Cadastrar usuário</span> <PlusCircleIcon className="w-5 md:w-6" />
      </Link>
    </main>
  );
}