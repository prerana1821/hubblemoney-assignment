import {
  BrandDataFromDB,
  VoucherDataFromDB,
  VoucherManagementData,
} from "@/types/app";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

const useGetMetadataById = (brandId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [metadata, setMetadata] = useState<{
    brand: BrandDataFromDB;
    vouchers: any;
  }>({ brand: {} as BrandDataFromDB, vouchers: [] });
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!brandId) {
      return;
    }

    setIsLoading(true);

    const fetchMetadata = async () => {
      try {
        const { data: brandData, error: brandError } = await supabaseClient
          .from("brands")
          .select("*")
          .eq("id", brandId)
          .single();

        if (brandError) {
          console.log(brandError);
          throw new Error("Failed to fetch brand data");
        }

        const { data: voucherData, error: voucherError } = await supabaseClient
          .from("vouchers")
          .select("*")
          .eq("brand_id", brandId);

        if (voucherError) {
          console.log(voucherError);
          throw new Error("Failed to fetch vouchers data");
        }

        setIsLoading(false);
        setMetadata({
          brand: brandData,
          vouchers: voucherData.map((voucher) => ({
            brannerImage: voucher.banner_path,
            discountPercentage: voucher.discount_percentage,
            expirationDate: voucher.expiration_date,
            FAQs: JSON.parse(voucher.faq),
            highlightsDescription: JSON.parse(voucher.highlights)[
              "description"
            ],
            highlights: JSON.parse(voucher.highlights)["list"],
            id: voucher.id,
          })),
        });
      } catch (error) {
        setIsLoading(false);
        if (error instanceof Error) {
          toast.error(`Error: ${error.message}`);
        }
      }
    };

    fetchMetadata();
  }, [brandId, supabaseClient]);

  return useMemo(
    () => ({
      isLoading,
      metadata,
    }),
    [isLoading, metadata]
  );
};

export default useGetMetadataById;
