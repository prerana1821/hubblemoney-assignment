import { Highlight, ServerSideFilters, TableData } from "@/types/app";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

// const useFilteredMetadata = async (filters: ServerSideFilters) => {
//   const [metadata, setMetadata] = useState<TableData[]>([]);
//   const [loading, setLoading] = useState(true);
//   const {
//     currentPage,
//     brandName,
//     brandCategory,
//     brandStatus,
//     expirationDate,
//     discountPercentage,
//     tableRows,
//   } = filters;

//   const { supabaseClient } = useSessionContext();

//   const limit = tableRows ? parseInt(tableRows) : 10;
//   const offset = (currentPage - 1) * limit;

//   try {
//     let voucherQuery = supabaseClient
//       .from("vouchers")
//       .select("id, brand_id, highlights, expiration_date, discount_percentage");

//     if (expirationDate) {
//       voucherQuery.lte("expiration_date", expirationDate);
//     }

//     if (discountPercentage) {
//       voucherQuery.lte("discount_percentage", discountPercentage);
//     }

//     const { data: vouchers, error: voucherError } = await voucherQuery;

//     if (voucherError) {
//       console.error("Supabase Voucher Error:", voucherError.message);
//       throw new Error("Failed to fetch vouchers.");
//     }

//     const brandIdsWithVouchers = vouchers.map((voucher) => voucher.brand_id);

//     let brandQuery = supabaseClient
//       .from("brands")
//       .select("id, name, category, status, logo_path")
//       .in("id", brandIdsWithVouchers);

//     if (brandName) {
//       brandQuery = brandQuery.ilike("name", `%${brandName}%`);
//     }

//     if (
//       (brandCategory && brandCategory.length > 0) ||
//       brandCategory === typeof "string"
//     ) {
//       if (Array.isArray(brandCategory)) {
//         brandQuery = brandQuery.in("category", brandCategory);
//       } else {
//         brandQuery = brandQuery.eq("category", brandCategory);
//       }
//     }

//     if (brandStatus) {
//       brandQuery = brandQuery.eq("status", brandStatus);
//     }

//     const { data: brands, error: brandError } = await brandQuery;

//     if (brandError) {
//       console.error("Supabase Brand Error:", brandError.message);
//       throw new Error("Failed to fetch brands.");
//     }

//     const tableData = brands.flatMap((brand) => {
//       const foundVouchers = vouchers.filter(
//         (voucher) => voucher.brand_id === brand.id
//       );

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

//       if (foundVouchers.length === 0) {
//         return [emptyVoucherBrand];
//       } else {
//         return foundVouchers.map((foundVoucher) => {
//           let parsedHighlight: string[] = [];
//           if (foundVoucher.highlights) {
//             const parsedHighlights = JSON.parse(foundVoucher.highlights) as {
//               list: Highlight[];
//             };
//             parsedHighlight = parsedHighlights.list.map(
//               (listItem) => listItem.title
//             );
//           }

//           return {
//             ...emptyVoucherBrand,
//             voucherId: foundVoucher.id,
//             highlights: parsedHighlight,
//             expirationDate: foundVoucher.expiration_date || "",
//             discountPercentage: foundVoucher.discount_percentage || "",
//           };
//         });
//       }
//     });

//     if (tableData.length > limit) {
//       return tableData.slice(offset, offset + limit);
//     } else {
//       return tableData;
//     }
//   } catch (error) {
//     console.error("Supabase Error:", error);
//     throw new Error("Failed to fetch data.");
//   }
// };

const useFilteredMetadata = (filters: ServerSideFilters) => {
  const [metadata, setMetadata] = useState<TableData[]>([]);
  const [loading, setLoading] = useState(true);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    const fetchMetadata = async () => {
      setLoading(true);

      const {
        currentPage,
        brandName,
        brandCategory,
        brandStatus,
        expirationDate,
        discountPercentage,
        tableRows,
      } = filters;

      const limit = tableRows ? parseInt(tableRows) : 10;
      const offset = (currentPage - 1) * limit;

      try {
        // Fetch vouchers
        let voucherQuery = supabaseClient
          .from("vouchers")
          .select(
            "id, brand_id, highlights, expiration_date, discount_percentage"
          );

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

        // Fetch brands
        const brandIdsWithVouchers = vouchers.map(
          (voucher) => voucher.brand_id
        );

        let brandQuery = supabaseClient
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

        // Combine brands and vouchers data
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
                const parsedHighlights = JSON.parse(
                  foundVoucher.highlights
                ) as {
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

        // Set metadata and loading state
        if (tableData.length > limit) {
          setMetadata(tableData.slice(offset, offset + limit));
        } else {
          setMetadata(tableData);
        }
        setLoading(false);
      } catch (error) {
        console.error("Supabase Error:", error);
        setLoading(false);
        throw new Error("Failed to fetch data.");
      }
    };

    fetchMetadata();
  }, [filters]);

  return { metadata, loading };
};

export default useFilteredMetadata;
