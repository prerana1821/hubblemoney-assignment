import { ServerSideFilters, TableData } from "@/types/app";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getFilteredMetadata = async (
  filters: ServerSideFilters
): Promise<any> => {
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

  const supabase = createServerComponentClient({ cookies: cookies });
  const limit = tableRows ? parseInt(tableRows) : 10;
  const offset = (currentPage - 1) * limit;

  try {
    // Fetch brands
    let brandQuery = supabase
      .from("brands")
      .select("id, name, category, status, logo_path")
      .range(offset, offset + limit - 1)
      .limit(limit);

    // Apply filters based on provided parameters
    if (brandName) {
      brandQuery = brandQuery.eq("name", brandName);
    }

    if (brandCategory && brandCategory.length > 0) {
      brandQuery = brandQuery.in("category", brandCategory);
    }

    if (brandStatus) {
      brandQuery = brandQuery.eq("status", brandStatus);
    }

    const { data: brands, error: brandError } = await brandQuery;

    if (brandError) {
      console.error("Supabase Brand Error:", brandError.message);
      throw new Error("Failed to fetch brands.");
    }

    // Fetch vouchers associated with brands
    const voucherIds = brands.map((brand: any) => brand.id);

    const voucherQuery = supabase
      .from("vouchers")
      .select("brand_id, highlights, expiration_date, discount_percentage")
      .in("brand_id", voucherIds);

    if (expirationDate) {
      voucherQuery.lte("expiration_date", expirationDate);
    }

    if (discountPercentage) {
      voucherQuery.lte("discount_percentage", discountPercentage);
    }

    const { data: vouchers, error: voucherError } = await voucherQuery;

    if (voucherError) {
      console.error("Supabase Voucher Error:", voucherError.message);
      throw new Error("Failed to fetch vouchers.");
    }

    const tableData = brands.map((brand: any) => {
      const associatedVouchers = vouchers.filter(
        (voucher: any) => voucher.brand_id === brand.id
      );
      return {
        brandName: brand.name,
        brandLogoPath: brand.logo_path,
        brandStatus: brand.status,
        brandCategory: brand.category,
        highlights: associatedVouchers.map(
          (voucher: any) => voucher.highlights
        ),
        expirationDate: associatedVouchers.map(
          (voucher: any) => voucher.expiration_date
        ),
        discountPercentage: associatedVouchers.map(
          (voucher: any) => voucher.discount_percentage
        ),
      };
    });

    console.log(tableData);

    return tableData;
  } catch (error) {
    console.error("Supabase Error:", error);
    throw new Error("Failed to fetch data.");
  }
};

export default getFilteredMetadata;
