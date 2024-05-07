import getFilteredMetadata from "@/app/actions/getFilteredMetadata";
import { transformMetadata } from "@/app/utils/table-data-handling";
import { ServerSideFilters, TableData } from "@/types/app";
import Image from "next/image";
import { BrandLogo } from "./brand-logo";

export default async function DataTable({
  filters,
}: {
  filters: ServerSideFilters;
}) {
  const metadata = await getFilteredMetadata(filters);

  const formattedMetadata = transformMetadata(metadata);

  return (
    <div className='mt-6 flow-root'>
      <div className='inline-block min-w-full align-middle'>
        <div className='rounded-lg bg-gray-50 p-2 md:pt-0'>
          {/* <div className='md:hidden'>
            {invoices?.map((invoice) => (
              <div
                key={invoice.id}
                className='mb-2 w-full rounded-md bg-white p-4'
              >
                <div className='flex items-center justify-between border-b pb-4'>
                  <div>
                    <div className='mb-2 flex items-center'>
                      <Image
                        src={invoice.image_url}
                        className='mr-2 rounded-full'
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      />
                      <p>{invoice.name}</p>
                    </div>
                    <p className='text-sm text-gray-500'>{invoice.email}</p>
                  </div>
                  <InvoiceStatus status={invoice.status} />
                </div>
                <div className='flex w-full items-center justify-between pt-4'>
                  <div>
                    <p className='text-xl font-medium'>
                      {formatCurrency(invoice.amount)}
                    </p>
                    <p>{formatDateToLocal(invoice.date)}</p>
                  </div>
                  <div className='flex justify-end gap-2'>
                    <UpdateInvoice id={invoice.id} />
                    <DeleteInvoice id={invoice.id} />
                  </div>
                </div>
              </div>
            ))}
          </div> */}
          <table className='hidden min-w-full text-gray-900 md:table'>
            <thead className='rounded-lg text-left text-sm font-normal'>
              <tr>
                <th scope='col' className='px-4 py-5 font-medium sm:pl-6'>
                  Brand Name
                </th>
                <th scope='col' className='px-3 py-5 font-medium'>
                  Brand Category
                </th>
                <th scope='col' className='px-3 py-5 font-medium'>
                  Brand Status
                </th>
                <th scope='col' className='px-3 py-5 font-medium'>
                  Voucher Highlights
                </th>
                <th scope='col' className='px-3 py-5 font-medium'>
                  Voucher Expiry Date
                </th>
                <th scope='col' className='px-3 py-5 font-medium'>
                  Voucher Discount %
                </th>
                <th scope='col' className='relative py-3 pl-6 pr-3'>
                  <span className='sr-only'>Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className='bg-white'>
              {formattedMetadata?.map((data: TableData) => (
                <tr
                  key={data.brandName}
                  className='w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
                >
                  <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                    <div className='flex items-center gap-3'>
                      <BrandLogo
                        brandLogoPath={data.brandLogoPath}
                        brandName={data.brandName}
                      />
                      <p>{data.brandName}</p>
                    </div>
                  </td>
                  <td className='whitespace-nowrap px-3 py-3'>
                    {data.brandCategory}
                  </td>
                  <td className='whitespace-nowrap px-3 py-3'>
                    {/* {formatCurrency(data.brandStatus)} */}
                    {data.brandStatus}
                  </td>
                  <td className='whitespace-nowrap px-3 py-3'>
                    {data.highlights.join(", ")}
                    {/* {formatDateToLocal(data.date)} */}
                  </td>
                  <td className='whitespace-nowrap px-3 py-3'>
                    {data.expirationDate}
                    {/* <dataStatus status={data.status} /> */}
                  </td>
                  <td className='whitespace-nowrap px-3 py-3'>
                    {data.discountPercentage} %
                    {/* <dataStatus status={dat/a.status} /> */}
                  </td>
                  <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                    <div className='flex justify-end gap-3'>
                      View
                      {/* Edit Update delete */}
                      {/* <UpdateInvoice id={invoice.id} />
                      <DeleteInvoice id={invoice.id} /> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
