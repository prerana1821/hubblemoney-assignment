import DataTable from "@/app/components/dashboard/table";
import TableFilters from "@/app/components/dashboard/table-filters";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    brandName?: string;
    brandCategory?: string[];
    brandStatus?: string;
    expirationDate?: string;
    discountPercentage?: string;
    selectedColumns?: string[];
    tableRows?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const brandName = searchParams?.brandName || "";
  const brandCategory = searchParams?.brandCategory || [];
  const brandStatus = searchParams?.brandStatus || "";
  const expirationDate = searchParams?.expirationDate || "";
  const discountPercentage = searchParams?.discountPercentage || "";
  const selectedColumns = searchParams?.selectedColumns || [];
  const tableRows = searchParams?.tableRows || "";

  return (
    <main>
      <h1 className={"mb-4 text-xl md:text-2xl"}>Dashboard</h1>
      <div className='mt-4 flex flex-col gap-2 md:mt-8'>
        <TableFilters />
      </div>
      <Suspense fallback={"loading..."}>
        <DataTable
          filters={{
            currentPage,
            brandName,
            brandCategory,
            brandStatus,
            expirationDate,
            discountPercentage,
            selectedColumns,
            tableRows,
          }}
        />
      </Suspense>
    </main>
  );
}
