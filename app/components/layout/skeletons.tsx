import { SHIMMER, TABLE_COLUMNS } from "@/app/utils/constants";
import { renderTableHeaders } from "@/app/utils/table-data-handling";

export const DashboardSkeleton = () => {
  return (
    <>
      <div
        className={`${SHIMMER} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-100`}
      />
      <div className='w-full h-4 bg-gray-100'></div>
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-6'>
        <div className='w-full h-2 bg-gray-100'></div>
      </div>
      <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8'>
        <TableSkeleton />
      </div>
    </>
  );
};

export function TableRowSkeleton() {
  return (
    <tr className='w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'>
      <td className='relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3'>
        <div className='flex items-center gap-3'>
          <div className='h-8 w-8 rounded-full bg-gray-100'></div>
          <div className='h-6 w-24 rounded bg-gray-100'></div>
        </div>
      </td>
      <td className='whitespace-nowrap px-3 py-3'>
        <div className='h-6 w-32 rounded bg-gray-100'></div>
      </td>
      <td className='whitespace-nowrap px-3 py-3'>
        <div className='h-6 w-16 rounded bg-gray-100'></div>
      </td>
      <td className='whitespace-nowrap px-3 py-3'>
        <div className='h-6 w-16 rounded bg-gray-100'></div>
      </td>
      <td className='whitespace-nowrap px-3 py-3'>
        <div className='h-6 w-16 rounded bg-gray-100'></div>
      </td>
      <td className='whitespace-nowrap px-3 py-3'>
        <div className='h-6 w-16 rounded bg-gray-100'></div>
      </td>
      <td className='whitespace-nowrap px-3 py-3'>
        <div className='h-6 w-16 rounded bg-gray-100'></div>
      </td>
      <td className='whitespace-nowrap py-3 pl-6 pr-3'>
        <div className='flex justify-end gap-3'>
          <div className='h-[38px] w-[38px] rounded bg-gray-100'></div>
          <div className='h-[38px] w-[38px] rounded bg-gray-100'></div>
          <div className='h-[38px] w-[38px] rounded bg-gray-100'></div>
        </div>
      </td>
    </tr>
  );
}

export function TableSkeleton() {
  return (
    <div className='mt-6 flow-root'>
      <div className='inline-block min-w-full align-middle'>
        <div className='rounded-lg bg-gray-50 p-2 md:pt-0'>
          <table className='min-w-full text-gray-900 table'>
            <thead className='rounded-lg text-left text-sm font-normal'>
              <tr className='w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'>
                {renderTableHeaders(
                  TABLE_COLUMNS.map((column) => column.value)
                )}
                <th
                  scope='col'
                  className='relative pb-4 pl-3 pr-6 pt-2 sm:pr-6'
                >
                  <span className='sr-only'>Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className='bg-white'>
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div
      className={`${SHIMMER} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
    >
      <div className='flex p-4'>
        <div className='h-5 w-5 rounded-md bg-gray-200' />
        <div className='ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium' />
      </div>
      <div className='flex items-center justify-center truncate rounded-xl bg-white px-4 py-8'>
        <div className='h-7 w-20 rounded-md bg-gray-200' />
      </div>
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
}

export function FormSkeleton() {
  return (
    <>
      <div className={`${SHIMMER} rounded-md p-4 md:p-6`}>
        <div className='ml-4'>
          <div className='h-4 bg-gray-200 rounded-full mb-2 w-40'></div>
          <div className='h-20 bg-gray-200 rounded-md mb-5'></div>
          <div className='mb-4'>
            <div className='flex justify-between align-middle'>
              <div className='h-4 bg-gray-200 rounded-full mb-2 w-32'></div>
            </div>
            <div className='h-10 bg-gray-200 rounded-md'></div>
          </div>
          <div className='mb-4'>
            <div className='h-4 bg-gray-200 rounded-full mb-2 w-48'></div>
            <div className='h-16 bg-gray-200 rounded-md flex items-start'></div>
          </div>
          <div className='mb-4'>
            <div className='h-4 bg-gray-200 rounded-full mb-2 w-40'></div>
            <div className='h-10 bg-gray-200 rounded-md'></div>
          </div>
          <div className='mb-4'>
            <div className='h-4 bg-gray-200 rounded-full mb-2 w-48'></div>
            <div className='h-12 bg-gray-200 rounded-md border border-gray-200 px-4 py-3'></div>
          </div>
        </div>
      </div>
      <div className='mt-6 flex justify-end gap-4'>
        <div className='h-10 bg-gray-200 rounded-lg w-24'></div>
        <div className='h-10 bg-gray-200 rounded-lg w-48'></div>
      </div>
    </>
  );
}

export function BrandCardSkeleton() {
  return (
    <div
      role='status'
      className='space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center'
    >
      <div className='flex items-center justify-center w-full h-48 bg-gray-300 sm:w-96'>
        <svg
          className='w-10 h-10 text-gray-200 rounded-full'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='currentColor'
          viewBox='0 0 20 18'
        >
          <path d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z' />
        </svg>
      </div>
      <div className='w-full'>
        <div className='h-2.5 bg-gray-200 rounded-full  w-48 mb-4'></div>
        <div className='h-2 bg-gray-200 rounded-full  max-w-[480px] mb-2.5'></div>
        <div className='h-2 bg-gray-200 rounded-full  mb-2.5'></div>
        <div className='h-2 bg-gray-200 rounded-full  max-w-[440px] mb-2.5'></div>
        <div className='h-2 bg-gray-200 rounded-full  max-w-[460px] mb-2.5'></div>
        <div className='h-2 bg-gray-200 rounded-full  max-w-[360px]'></div>
      </div>
      <span className='sr-only'>Loading...</span>
    </div>
  );
}

export function VoucherCardSkeleton() {
  return (
    <div>
      <div
        role='status'
        className='flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse '
      >
        <svg
          className='w-10 h-10 text-gray-200 '
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='currentColor'
          viewBox='0 0 16 20'
        >
          <path d='M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z' />
          <path d='M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z' />
        </svg>
        <span className='sr-only'>Loading...</span>
      </div>
      <br />
      <br />
      <br />
      <br />

      <div role='status' className='space-y-2.5 animate-pulse max-w-lg'>
        <div className='flex items-center w-full'>
          <div className='h-2.5 bg-gray-200 rounded-full  w-32'></div>
          <div className='h-2.5 ms-2 bg-gray-300 rounded-full  w-24'></div>
          <div className='h-2.5 ms-2 bg-gray-300 rounded-full  w-full'></div>
        </div>
        <div className='flex items-center w-full max-w-[480px]'>
          <div className='h-2.5 bg-gray-200 rounded-full  w-full'></div>
          <div className='h-2.5 ms-2 bg-gray-300 rounded-full  w-full'></div>
          <div className='h-2.5 ms-2 bg-gray-300 rounded-full  w-24'></div>
        </div>
        <div className='flex items-center w-full max-w-[400px]'>
          <div className='h-2.5 bg-gray-300 rounded-full  w-full'></div>
          <div className='h-2.5 ms-2 bg-gray-200 rounded-full  w-80'></div>
          <div className='h-2.5 ms-2 bg-gray-300 rounded-full  w-full'></div>
        </div>
        <div className='flex items-center w-full max-w-[480px]'>
          <div className='h-2.5 ms-2 bg-gray-200 rounded-full  w-full'></div>
          <div className='h-2.5 ms-2 bg-gray-300 rounded-full  w-full'></div>
          <div className='h-2.5 ms-2 bg-gray-300 rounded-full  w-24'></div>
        </div>
        <div className='flex items-center w-full max-w-[440px]'>
          <div className='h-2.5 ms-2 bg-gray-300 rounded-full  w-32'></div>
          <div className='h-2.5 ms-2 bg-gray-300 rounded-full  w-24'></div>
          <div className='h-2.5 ms-2 bg-gray-200 rounded-full  w-full'></div>
        </div>
        <div className='flex items-center w-full max-w-[360px]'>
          <div className='h-2.5 ms-2 bg-gray-300 rounded-full  w-full'></div>
          <div className='h-2.5 ms-2 bg-gray-200 rounded-full  w-80'></div>
          <div className='h-2.5 ms-2 bg-gray-300 rounded-full  w-full'></div>
        </div>
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  );
}
