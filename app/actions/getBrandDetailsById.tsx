import { BrandDataFromDB } from "@/types/app";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getBrandDetailsById = async (id: string): Promise<BrandDataFromDB> => {
  const supabase = createServerComponentClient({ cookies: cookies });

  const { data, error } = await supabase
    .from("brands")
    .select("*")
    .eq("id", id);

  if (error) {
    console.error(error);
  }

  return data ? data[0] : null;
};

export default getBrandDetailsById;
