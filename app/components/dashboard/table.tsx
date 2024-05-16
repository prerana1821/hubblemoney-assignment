"use client";

import {
  renderTableCell,
  renderTableHeaders,
} from "@/app/utils/table-data-handling";
import { ServerSideFilters, TableData } from "@/types/app";
import Dropdown from "./dropdown";
import Pagination from "./pagination";
import useFilteredMetadata from "@/hooks/useFilteredMetadata";
import { TableSkeleton } from "../layout/skeletons";
import useTotalRowCount from "@/hooks/useTotalRowCount";
import { useEffect, useState } from "react";

export default function DataTable({ filters }: { filters: ServerSideFilters }) {
  const { metadata, loading: metadataLoading } = useFilteredMetadata(filters);
  const { totalRowCount, loading: totalRowCountLoading } =
    useTotalRowCount(filters);

  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const totalPages = Math.ceil(Number(totalRowCount) / +filters.tableRows);

    setTotalPages(totalPages);
  }, [totalRowCount, filters.tableRows]);

  return (
    <div className='mt-6 flow-root'>
      <div className='inline-block min-w-full align-middle'>
        <div className='rounded-lg bg-gray-50 p-2 md:pt-0'>
          {metadataLoading ? (
            <TableSkeleton />
          ) : (
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
                {metadata?.map((data: TableData) => (
                  <tr
                    key={`data-${data.voucherId}-${data.brandId}`}
                    className='w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
                  >
                    {filters.selectedColumns.map((columnName) =>
                      renderTableCell(columnName, data)
                    )}
                    <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                      <Dropdown
                        brandId={data.brandId}
                        voucherId={data.voucherId}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className='mt-5 flex w-full justify-center'>
            {!metadataLoading && !totalRowCountLoading && (
              <Pagination totalPages={totalPages} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
