import { StorageType } from "@/types/app";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getStorageType } from "../utils/table-data-handling";

const getImage = async (path: string, type: StorageType): Promise<string> => {
  const supabase = createServerComponentClient({ cookies: cookies });

  const storageType = getStorageType(type);

  const { data: imageData } = supabase.storage
    .from(storageType)
    .getPublicUrl(path);

  return imageData.publicUrl;
};

export default getImage;
