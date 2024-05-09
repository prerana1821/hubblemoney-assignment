import { getStorageType } from "@/app/utils/table-data-handling";
import { StorageType } from "@/types/app";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadImage = (path: string, type: StorageType) => {
  const supabaseClient = useSupabaseClient();

  const storageType = getStorageType(type);

  const { data: imageData } = supabaseClient.storage
    .from(storageType)
    .getPublicUrl(path);

  return imageData.publicUrl;
};

export default useLoadImage;
