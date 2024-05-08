import { VoucherDataFromDB } from "@/types/app";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getVoucherDetailsById = async (
  id: string
): Promise<VoucherDataFromDB> => {
  const supabase = createServerComponentClient({ cookies: cookies });

  const { data, error } = await supabase
    .from("vouchers")
    .select(
      `*, 
      brands ( name, category )`
    )
    .eq("id", id);

  if (error) {
    console.error(error);
    throw error;
  }

  if (!data || data.length === 0) {
    throw new Error("Voucher not found");
  }

  const voucherWithBrandInfo: VoucherDataFromDB = {
    id: data[0].id,
    banner_path: data[0].banner_path,
    brand: { ...data[0].brands, id: data[0].brand_id },
    discountPercentage: data[0].discount_percentage,
    expirationDate: data[0].expiration_date,
    FAQs: JSON.parse(data[0].faq),
    highlightsDescription: JSON.parse(data[0].highlights)["description"],
    highlights: JSON.parse(data[0].highlights)["list"],
  };

  return voucherWithBrandInfo;
};

export default getVoucherDetailsById;
