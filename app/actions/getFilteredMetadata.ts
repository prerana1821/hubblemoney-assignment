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
    // Fetch brands
    let brandQuery = supabase
      .from("brands")
      .select("id, name, category, status, logo_path")
      .range(offset, offset + limit - 1)
      .limit(limit);

    if (brandName) {
      brandQuery = brandQuery.ilike("name", `%${brandName}%`);
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
      .select("id, brand_id, highlights, expiration_date, discount_percentage")
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

    // const associatedVouchers = vouchers.filter(
    //   (voucher: any) => vouher.brand_id === brand.id
    // );

    // const tableData = brands.map(
    //   (brand: Omit<BrandDataFromDB, "description">) => {
    //     const foundVoucher = vouchers.find(
    //       (voucher) => voucher.brand_id === brand.id
    //     );

    //     console.log({ foundVoucher });

    //     if (!foundVoucher) {
    //       const emptyVoucherBrand: TableData = {
    //         brandId: brand.id,
    //         brandName: brand.name,
    //         brandLogoPath: brand.logo_path,
    //         brandStatus: brand.status,
    //         brandCategory: brand.category,
    //         highlights: [],
    //         expirationDate: "",
    //         discountPercentage: "",
    //       };
    //       return emptyVoucherBrand;
    //     } else {
    //       const transformedItem: TableData = {
    //         brandId: brand.id,
    //         brandName: brand.name,
    //         brandLogoPath: brand.logo_path,
    //         brandStatus: brand.status,
    //         brandCategory: brand.category,
    //         highlights: [],
    //         expirationDate: "",
    //         discountPercentage: "",
    //       };

    //       let parsedHighlight: string[] = [];
    //       if (foundVoucher?.highlights) {
    //         const parsedHighlights = JSON.parse(foundVoucher?.highlights) as {
    //           list: Highlight[];
    //         };

    //         parsedHighlight = parsedHighlights.list.map(
    //           (listItem) => listItem.title
    //         );
    //       }

    //       return {
    //         ...transformedItem,
    //         highlights: parsedHighlight,
    //         voucherId: foundVoucher?.id || "",
    //         expirationDate: foundVoucher?.expiration_date,
    //         discountPercentage: foundVoucher?.discount_percentage,
    //       };
    //     }
    //     // return {
    //     //   brandId: brand.id,
    //     //   brandName: brand.name,
    //     //   brandLogoPath: brand.logo_path,
    //     //   brandStatus: brand.status,
    //     //   brandCategory: brand.category,
    //     //   highlights: associatedVouchers.map(
    //     //     (voucher: any) => voucher.highlights
    //     //   ),
    //     //   expirationDate: associatedVouchers.map(
    //     //     (voucher: any) => voucher.expiration_date
    //     //   ),
    //     //   discountPercentage: associatedVouchers.map(
    //     //     (voucher: any) => voucher.discount_percentage
    //     //   ),
    //     // };
    //   }
    // );

    const tableData = brands.flatMap(
      (brand: Omit<BrandDataFromDB, "description">) => {
        const foundVouchers = vouchers.filter(
          (voucher) => voucher.brand_id === brand.id
        );

        if (foundVouchers.length === 0) {
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
              brandId: brand.id,
              brandName: brand.name,
              brandLogoPath: brand.logo_path,
              brandStatus: brand.status,
              brandCategory: brand.category,
              voucherId: foundVoucher.id,
              highlights: parsedHighlight,
              expirationDate: foundVoucher.expiration_date || "",
              discountPercentage: foundVoucher.discount_percentage || "",
            };
          });
        }
      }
    );

    return tableData;
  } catch (error) {
    console.error("Supabase Error:", error);
    throw new Error("Failed to fetch data.");
  }
};

export default getFilteredMetadata;
