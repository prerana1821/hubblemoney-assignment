import { Brand, BrandData } from "@/types/app";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

interface BrandCounts {
  totalCount: number;
  activeCount: number;
  inactiveCount: number;
}

const getMetadataCardDetails = async (): Promise<BrandCounts> => {
  const supabase = createServerComponentClient({ cookies: cookies });

  // Get total brands count
  const { data: totalData, error: totalError } = await supabase
    .from("brands")
    .select("*");

  if (totalError) {
    console.error("Error fetching total brands count:", totalError.message);
    return {
      totalCount: 0,
      activeCount: 0,
      inactiveCount: 0,
    };
  }

  const totalCount = totalData ? totalData.length : 0;

  // Get active brands count
  const { data: activeData, error: activeError } = await supabase
    .from("brands")
    .select("*")
    .eq("status", "Active");

  if (activeError) {
    console.error("Error fetching active brands count:", activeError.message);
    return {
      totalCount,
      activeCount: 0,
      inactiveCount: totalCount,
    };
  }

  const activeCount = activeData ? activeData.length : 0;
  const inactiveCount = totalCount - activeCount;

  return {
    totalCount,
    activeCount,
    inactiveCount,
  };
};

export default getMetadataCardDetails;
