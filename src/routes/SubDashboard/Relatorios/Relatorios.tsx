// import Search from '@/app/ui/search';

import { useEffect } from "react"

export default function Relatorios() {
  useEffect(() => {
    document.title = "Agro Current - Sensor"
  }, [])
  return (
    <>
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Relatorios</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        {/* <CreateInvoice /> */}
      </div>
      {/* <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense> */}
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
    </>
  )
}