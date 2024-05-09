import { ServerSideFilters } from "@/types/app";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getTotalRowCount = async (filters: ServerSideFilters) => {
  const {
    brandName,
    brandCategory,
    brandStatus,
    expirationDate,
    discountPercentage,
  } = filters;

  const supabase = createServerComponentClient({ cookies: cookies });

  try {
    let voucherQuery = supabase.from("vouchers").select("id, brand_id");

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

    const brandIdsWithVouchers = vouchers.map((voucher) => voucher.brand_id);

    let brandQuery = supabase
      .from("brands")
      .select("id")
      .in("id", brandIdsWithVouchers);

    if (brandName) {
      brandQuery = brandQuery.ilike("name", `%${brandName}%`);
    }
    if (
      (brandCategory && brandCategory.length > 0) ||
      brandCategory === typeof "string"
    ) {
      if (Array.isArray(brandCategory)) {
        brandQuery = brandQuery.in("category", brandCategory);
      } else {
        brandQuery = brandQuery.eq("category", brandCategory);
      }
    }

    if (brandStatus) {
      brandQuery = brandQuery.eq("status", brandStatus);
    }

    const { data: brands, error: brandError } = await brandQuery;

    if (brandError) {
      console.error("Supabase Brand Error:", brandError.message);
      throw new Error("Failed to fetch brands.");
    }

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

    const totalCount = tableData.length;

    return totalCount;
  } catch (error) {
    console.error("Supabase Error:", error);
    throw new Error("Failed to fetch data.");
  }
};

export default getTotalRowCount;
