import getFilteredMetadata from "@/app/actions/getFilteredMetadata";
import {
  renderTableHeaders,
  transformMetadata,
} from "@/app/utils/table-data-handling";
import { ServerSideFilters, TableData } from "@/types/app";
import { BrandLogo } from "./brand-logo";
import { formatDateToLocal } from "@/app/utils/string-manipulation";
import Dropdown from "../shared/dropdown";
import Pagination from "./pagination";

export default async function DataTable({
  filters,
}: {
  filters: ServerSideFilters;
}) {
  const metadata = await getFilteredMetadata(filters);
  const formattedMetadata = transformMetadata(metadata);
  const limitedMetadata = formattedMetadata?.slice(0, +filters.tableRows);

  const totalPages = Math.ceil(
    Number(limitedMetadata.length) / +filters.tableRows
  );

  return (
    <div className='mt-6 flow-root'>
      <div className='inline-block min-w-full align-middle'>
        <div className='rounded-lg bg-gray-50 p-2 md:pt-0'>
          <table className='hidden min-w-full text-gray-900 md:table'>
            <thead className='rounded-lg text-left text-sm font-normal'>
              <tr>
                {renderTableHeaders(filters.selectedColumns)}
                <th scope='col' className='relative py-3 pl-6 pr-3'>
                  <span className='sr-only'>Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className='bg-white'>
              {limitedMetadata?.map((data: TableData) => (
                <tr
                  key={data.brandId}
                  className='w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
                >
                  {(filters.selectedColumns.length === 0 ||
                    filters.selectedColumns.includes("Brand Name")) && (
                    <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                      <div className='flex items-center gap-3'>
                        <BrandLogo
                          brandLogoPath={data.brandLogoPath}
                          brandName={data.brandName}
                        />
                        <p>{data.brandName}</p>
                      </div>
                    </td>
                  )}
                  {(filters.selectedColumns.length === 0 ||
                    filters.selectedColumns.includes("Brand Category")) && (
                    <td className='whitespace-nowrap px-3 py-3'>
                      {data.brandCategory}
                    </td>
                  )}
                  {(filters.selectedColumns.length === 0 ||
                    filters.selectedColumns.includes("Brand Status")) && (
                    <td className='whitespace-nowrap px-3 py-3'>
                      {data.brandStatus}
                    </td>
                  )}
                  {(filters.selectedColumns.length === 0 ||
                    filters.selectedColumns.includes("Voucher Highlights")) && (
                    <td className='px-3 py-3 truncate max-w-40'>
                      {data.highlights.join(", ")}
                    </td>
                  )}
                  {(filters.selectedColumns.length === 0 ||
                    filters.selectedColumns.includes(
                      "Voucher Expiry Date"
                    )) && (
                    <td className='whitespace-nowrap px-3 py-3'>
                      {formatDateToLocal(data.expirationDate)}
                    </td>
                  )}
                  {(filters.selectedColumns.length === 0 ||
                    filters.selectedColumns.includes("Voucher Discount")) && (
                    <td className='whitespace-nowrap px-3 py-3'>
                      {data.discountPercentage} %
                    </td>
                  )}
                  <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                    <Dropdown id={data.brandId} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className='mt-5 flex w-full justify-center'>
            <Pagination totalPages={totalPages} />
          </div>
        </div>
      </div>
    </div>
  );
}
