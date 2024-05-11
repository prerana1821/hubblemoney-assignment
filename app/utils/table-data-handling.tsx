import {
  BrandDataFromDB,
  Highlight,
  StorageType,
  TableData,
} from "@/types/app";
import {
  BRAND_STATUS,
  CATEGORIES,
  COLUMN_NAMES,
  TABLE_COLUMNS,
} from "./constants";
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
  // if the total number of pages is 7 or less, display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // if the current page is among the first 3 pages, show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // if the current page is among the last 3 pages, show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // if the current page is somewhere in the middle, show the first page, an ellipsis, the current page and its neighbors, another ellipsis, and the last page.
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

interface FilteredBrand {
  id: string;
  name: string;
  category: (typeof CATEGORIES)[number];
  status: (typeof BRAND_STATUS)[number];
  logo_path: string;
}

interface FilteredVoucher {
  id: string;
  brand_id: string;
  highlights: string;
  expiration_date: string;
  discount_percentage: string;
}

export const formatTableData = ({
  brands,
  vouchers,
}: {
  brands: FilteredBrand[];
  vouchers: FilteredVoucher[];
}) => {
  const tableData = brands.flatMap((brand) => {
    const foundVouchers = vouchers.filter(
      (voucher) => voucher.brand_id === brand.id
    );

    const emptyVoucherBrand: TableData = {
      brandId: brand.id,
      brandName: brand.name,
      brandLogoPath: brand.logo_path,
      brandStatus: brand.status,
      brandCategory: brand.category,
      highlights: [],
      expirationDate: "",
      discountPercentage: "",
    };

    if (foundVouchers.length === 0) {
      return [emptyVoucherBrand];
    } else {
      return foundVouchers.map((foundVoucher) => {
        let parsedHighlight: string[] = [];
        if (foundVoucher.highlights) {
          const parsedHighlights = JSON.parse(foundVoucher.highlights) as {
            list: Highlight[];
          };
          parsedHighlight = parsedHighlights.list.map(
            (listItem) => listItem.title
          );
        }

        return {
          ...emptyVoucherBrand,
          voucherId: foundVoucher.id,
          highlights: parsedHighlight,
          expirationDate: foundVoucher.expiration_date || "",
          discountPercentage: foundVoucher.discount_percentage || "",
        };
      });
    }
  });

  return tableData;
};

export const formatTableDataForRowCount = ({
  brands,
  vouchers,
}: {
  brands: { id: string }[];
  vouchers: { id: string; brand_id: string }[];
}) => {
  const tableData = brands.flatMap((brand) => {
    const foundVouchers = vouchers.filter(
      (voucher) => voucher.brand_id === brand.id
    );

    if (foundVouchers.length === 0) {
      const emptyVoucherBrand = {
        brandId: brand.id,
      };
      return [emptyVoucherBrand];
    } else {
      return foundVouchers.map((foundVoucher) => {
        return {
          brandId: brand.id,
          voucherId: foundVoucher.id,
        };
      });
    }
  });

  return tableData;
};
