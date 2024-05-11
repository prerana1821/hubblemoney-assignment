import { formatTableDataForRowCount } from "@/app/utils/table-data-handling";
import { ServerSideFilters } from "@/types/app";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";

const useTotalRowCount = (filters: ServerSideFilters) => {
  const [totalRowCount, setTotalRowCount] = useState(0);

  const [loading, setLoading] = useState(true);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    const fetchTotalRowCount = async () => {
      setLoading(true);

      const {
        brandName,
        brandCategory,
        brandStatus,
        expirationDate,
        discountPercentage,
      } = filters;

      try {
        let voucherQuery = supabaseClient
          .from("vouchers")
          .select("id, brand_id");

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

        const brandIdsWithVouchers = vouchers.map(
          (voucher) => voucher.brand_id
        );

        let brandQuery = supabaseClient
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

        const tableData = formatTableDataForRowCount({ brands, vouchers });

        const totalCount = tableData.length;
        setTotalRowCount(totalCount);
        setLoading(false);
      } catch (error) {
        console.error("Supabase Error:", error);
        setLoading(false);
        throw new Error("Failed to fetch data.");
      }
    };

    fetchTotalRowCount();
  }, [filters, supabaseClient]);

  return useMemo(
    () => ({
      totalRowCount,
      loading,
    }),
    [totalRowCount, loading]
  );
};

export default useTotalRowCount;
