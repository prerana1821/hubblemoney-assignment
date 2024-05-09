import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getImage = async (
  path: string,
  type: "brands" | "vouchers"
): Promise<string> => {
  const supabase = createServerComponentClient({ cookies: cookies });

  let storageType = "";
  if (type === "brands") {
    storageType = "logos";
  } else if (type === "vouchers") {
    storageType = "banners";
  }

  const { data: imageData } = supabase.storage
    .from(storageType)
    .getPublicUrl(path);

  return imageData.publicUrl;
};

export default getImage;
