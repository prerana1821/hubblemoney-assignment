import { Brand } from "@/types/app";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getBrandNames = async (): Promise<Brand[]> => {
  const supabase = createServerComponentClient({ cookies: cookies });

  const { data, error } = await supabase.from("brands").select("id, name");

  if (error) {
    console.error(error);
  }

  return data ?? [];
};

export default getBrandNames;
