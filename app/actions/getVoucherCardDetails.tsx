import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getVoucherCardDetails = async (): Promise<{
  totalCount: number;
  activeCount: number;
  expiredCount: number;
}> => {
  const supabase = createServerComponentClient({ cookies: cookies });

  const { data: totalData, error: totalError } = await supabase
    .from("vouchers")
    .select("id");

  if (totalError) {
    console.error("Error fetching total voucher count:", totalError.message);
    return {
      totalCount: 0,
      activeCount: 0,
      expiredCount: 0,
    };
  }

  const totalCount = totalData ? totalData.length : 0;

  const currentDate = new Date();
  const { data: activeData, error: activeError } = await supabase
    .from("vouchers")
    .select("id")
    .gt("expiration_date", currentDate.toISOString());

  if (activeError) {
    console.error("Error fetching active voucher count:", activeError.message);
    return {
      totalCount,
      activeCount: 0,
      expiredCount: totalCount,
    };
  }

  const activeCount = activeData ? activeData.length : 0;
  const expiredCount = totalCount - activeCount;

  return {
    totalCount,
    activeCount,
    expiredCount,
  };
};

export default getVoucherCardDetails;
