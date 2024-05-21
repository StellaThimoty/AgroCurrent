import CardWrapper from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { fetchFilteredUsers } from '@/app/lib/data';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Suspense } from 'react'
import { LatestInvoicesSkeleton, RevenueChartSkeleton, CardsSkeleton } from '@/app/ui/skeletons';
import UserTable from '@/app/ui/users/usertable';
 
export default async function Page({ searchParams }: {searchParams?: {query?: string; page?: string;}}) {
  const query = searchParams?.query || '';
  const users = await fetchFilteredUsers(query)
  return (
    <main> 
      <div className='flex'>
        <h1 className='mb-4 text-2xl'>Usuários</h1>
        <Link className='mx-4' href="/dashboard/create">
          <button className="flex text-black bg-yellow-500 px-2 py-2 hover:bg-lime-200">Cadastrar usuário <PlusCircleIcon className="w-6 mx-1" /></button>
        </Link>
      </div>
      <UserTable users={users}/>
    </main>
  );
}