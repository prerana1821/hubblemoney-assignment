import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadImage = (path: string, type: "brands" | "vouchers") => {
  const supabaseClient = useSupabaseClient();

  let storageType = "";
  if (type === "brands") {
    storageType = "logos";
  } else if (type === "vouchers") {
    storageType = "banners";
  }

  const { data: imageData } = supabaseClient.storage
    .from(storageType)
    .getPublicUrl(path);

  return imageData.publicUrl;
};

export default useLoadImage;
