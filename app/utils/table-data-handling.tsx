import { StorageType, TableData } from "@/types/app";
import { COLUMN_NAMES, TABLE_COLUMNS } from "./constants";
import HighlightModal from "../components/dashboard/highlight-modal";
import { formatDateToLocal } from "./string-manipulation";
import { BrandLogo } from "../components/dashboard/brand-logo";

export function renderTableHeaders(selectedColumns: string[]) {
  return TABLE_COLUMNS.map(
    (column) =>
      (selectedColumns.length === 0 ||
        selectedColumns.includes(column.value)) && (
        <th key={column.value} scope='col' className='px-3 py-5 font-medium'>
          {column.value}
        </th>
      )
  );
}

export function renderTableCell(
  columnName: (typeof COLUMN_NAMES)[number],
  data: TableData
) {
  switch (columnName) {
    case "Brand Name":
      return (
        <td className='whitespace-nowrap py-3 pl-6 pr-3'>
          <div className='flex items-center gap-3'>
            <BrandLogo
              brandLogoPath={data.brandLogoPath}
              brandName={data.brandName}
            />
            <p>{data.brandName}</p>
          </div>
        </td>
      );
    case "Brand Category":
      return (
        <td className='whitespace-nowrap px-3 py-3'>{data.brandCategory}</td>
      );
    case "Brand Status":
      return (
        <td className='whitespace-nowrap px-3 py-3'>{data.brandStatus}</td>
      );
    case "Voucher Highlights":
      return (
        <td>
          <HighlightModal highlights={data.highlights} />
        </td>
      );
    case "Voucher Expiry Date":
      return (
        <td className='whitespace-nowrap px-3 py-3'>
          {formatDateToLocal(data.expirationDate)}
        </td>
      );
    case "Voucher Discount":
      return (
        <td className='whitespace-nowrap px-3 py-3'>
          {data.discountPercentage} %
        </td>
      );
    default:
      return null;
  }
}

export const getStorageType = (type: StorageType): string => {
  return type === "brands" ? "logos" : type === "vouchers" ? "banners" : "";
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
