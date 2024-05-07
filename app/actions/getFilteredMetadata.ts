import { ServerSideFilters, TableData } from "@/types/app";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getFilteredMetadata = async (
  filters: ServerSideFilters
): Promise<TableData[]> => {
  const {
    currentPage,
    brandName,
    brandCategory,
    brandStatus,
    expirationDate,
    discountPercentage,
    selectedColumns,
    tableRows,
  } = filters;

  console.log({ filters });

  const supabase = createServerComponentClient({ cookies: cookies });
  const limit = tableRows ? parseInt(tableRows) : 10;
  const offset = (currentPage - 1) * limit;

  try {
    let brandQuery = supabase
      .from("brands")
      .select("name, category, status, logo_path");
    let voucherQuery = supabase
      .from("vouchers")
      .select("highlights, expiration_date, discount_percentage");

    if (brandName) {
      brandQuery = brandQuery.eq("name", brandName);
    }

    if (brandCategory && brandCategory.length > 0) {
      brandQuery = brandQuery.in("category", brandCategory);
    }

    if (brandStatus) {
      brandQuery = brandQuery.eq("status", brandStatus);
    }

    if (expirationDate) {
      voucherQuery = voucherQuery.lte("expiration_date", expirationDate);
    }

    if (discountPercentage) {
      voucherQuery = voucherQuery.lte(
        "discount_percentage",
        discountPercentage
      );
    }

    brandQuery = brandQuery.limit(limit).range(offset, offset + limit - 1);
    voucherQuery = voucherQuery.limit(limit).range(offset, offset + limit - 1);

    const { data: brands, error: brandError } = await brandQuery;

    if (brandError) {
      console.error("Supabase Brand Error:", brandError.message);
      throw new Error("Failed to fetch brands.");
    }

    const { data: vouchers, error: voucherError } = await voucherQuery;

    if (voucherError) {
      console.error("Supabase Voucher Error:", voucherError.message);
      throw new Error("Failed to fetch vouchers.");
    }

    const tableData: TableData[] = [];

    // brands.forEach((obj, i, arr) => {
    //   const objFromArr2 = vouchers.find(({ id }) => id === obj.id) || {};

    //  tableData.push({
    //    brandName: obj.name,
    //    brandStatus: obj.status,
    //    brandCategory: obj.category,
    //    brandLogoPath: obj.logo_path
    //    highlights: [],
    //    expirationDate: "",
    //    discountPercentage: "",
    //  });
    // });

    // return { brands, vouchers } ?? {};
    return tableData ?? [];
  } catch (error) {
    console.error("Supabase Error:", error);
    throw new Error("Failed to fetch data.");
  }
};

export default getFilteredMetadata;
