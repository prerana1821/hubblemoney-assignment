import {
  BrandDataFromDB,
  Highlight,
  ServerSideFilters,
  TableData,
} from "@/types/app";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getFilteredMetadata = async (filters: ServerSideFilters) => {
  const {
    currentPage,
    brandName,
    brandCategory,
    brandStatus,
    expirationDate,
    discountPercentage,
    tableRows,
  } = filters;

  const supabase = createServerComponentClient({ cookies: cookies });
  const limit = tableRows ? parseInt(tableRows) : 10;
  const offset = (currentPage - 1) * limit;

  try {
    let voucherQuery = supabase
      .from("vouchers")
      .select("id, brand_id, highlights, expiration_date, discount_percentage");
    // .range(offset, offset + limit - 1)
    // .order("created_at", { ascending: false });

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
      .select("id, name, category, status, logo_path")
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

    const orderedAndLimitedBrands = tableData.slice(offset, offset + limit);

    return orderedAndLimitedBrands;
  } catch (error) {
    console.error("Supabase Error:", error);
    throw new Error("Failed to fetch data.");
  }
};

export default getFilteredMetadata;
