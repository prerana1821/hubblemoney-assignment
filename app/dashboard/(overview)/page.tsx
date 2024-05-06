import DataTable from "@/app/components/dashboard/table";
import TableFilters from "@/app/components/dashboard/table-filters";

export default async function Page() {
  return (
    <main>
      <h1 className={"mb-4 text-xl md:text-2xl"}>Dashboard</h1>
      <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
        {/* filters */}
        <TableFilters />
      </div>
      <DataTable query={""} currentPage={1} />
      {/* <div className='mt-5 flex w-full justify-center'>
        <Pagination totalPages={totalPages} />
      </div> */}
    </main>
  );
}
