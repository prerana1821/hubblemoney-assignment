import { Highlight, MetadataItem, TableData } from "@/types/app";

export function transformMetadata(metadata: MetadataItem[]) {
  const transformedMetadata: TableData[] = [];

  metadata.forEach((item) => {
    if (item.discountPercentage.length === 0) {
      const emptyItem: TableData = {
        brandId: item.brandId,
        brandName: item.brandName,
        brandLogoPath: item.brandLogoPath,
        brandStatus: item.brandStatus,
        brandCategory: item.brandCategory,
        highlights: [],
        expirationDate: "",
        discountPercentage: "",
      };
      transformedMetadata.push(emptyItem);
    } else {
      for (let i = 0; i < item.discountPercentage.length; i++) {
        const transformedItem: TableData = {
          brandId: item.brandId,
          brandName: item.brandName,
          brandLogoPath: item.brandLogoPath,
          brandStatus: item.brandStatus,
          brandCategory: item.brandCategory,
          highlights: [],
          expirationDate: "",
          discountPercentage: "",
        };

        if (item.highlights[i]) {
          const parsedHighlight = JSON.parse(item.highlights[i]) as {
            list: Highlight[];
          };
          transformedItem.highlights = parsedHighlight.list.map(
            (listItem) => listItem.title
          );
        }

        transformedItem.discountPercentage =
          item.discountPercentage[i].toString();
        transformedItem.expirationDate = item.expirationDate[i] || "";

        transformedMetadata.push(transformedItem);
      }
    }
  });

  return transformedMetadata;
}

export function renderTableHeaders(selectedColumns: string[]) {
  const columns = [
    { key: "Brand Name", label: "Brand Name" },
    { key: "Brand Category", label: "Brand Category" },
    { key: "Brand Status", label: "Brand Status" },
    { key: "Voucher Highlights", label: "Voucher Highlights" },
    { key: "Voucher Expiry Date", label: "Voucher Expiry Date" },
    { key: "Voucher Discount", label: "Voucher Discount" },
  ];

  return columns.map(
    (column) =>
      (selectedColumns.length === 0 ||
        selectedColumns.includes(column.key)) && (
        <th key={column.key} scope='col' className='px-3 py-5 font-medium'>
          {column.label}
        </th>
      )
  );
}

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
