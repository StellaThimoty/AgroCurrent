import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
export const metadata: Metadata = {
  title: 'Edit Invoice'
}
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);
  if (!invoice){
    notFound();
  }
  return (
    <main>
      <Carousel>
  <CarouselContent className="-ml-2 md:-ml-4">
    <CarouselItem className="pl-2 md:pl-4">...</CarouselItem>
    <CarouselItem className="pl-2 md:pl-4">...</CarouselItem>
    <CarouselItem className="pl-2 md:pl-4">...</CarouselItem>
  </CarouselContent>
</Carousel>

      <Form invoice={invoice} customers={customers} />
    </main>
  );
}