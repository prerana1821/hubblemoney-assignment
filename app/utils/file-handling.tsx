import { BrandData, ImageFileData, VoucherManagementData } from "@/types/app";
import { SetStateAction } from "react";

type FormData = BrandData | VoucherManagementData;

export const uploadFiles = (
  files: ImageFileData[],
  type: "brandLogo" | "voucherBanner",
  formData: FormData
) => {
  const updatedFormData = { ...formData };

  files.forEach((file, index) => {
    if (index === 0) {
      if ("logo" in updatedFormData && type === "brandLogo") {
        updatedFormData.logo = {
          name: file.name,
          photo: file.photo,
          type: file.type,
          size: file.size,
          file: file.file,
        };
      } else if ("bannerImage" in updatedFormData && type === "voucherBanner") {
        updatedFormData.bannerImage = {
          name: file.name,
          photo: file.photo,
          type: file.type,
          size: file.size,
          file: file.file,
        };
      }
    }
  });

  return updatedFormData;
};

export const deleteFile = (
  type: "brandLogo" | "voucherBanner",
  formData: FormData
) => {
  const updatedFormData = { ...formData };

  if ("logo" in updatedFormData && type === "brandLogo") {
    updatedFormData.logo = {
      name: "",
      photo: "",
      type: "",
      size: 0,
      file: null,
    };
  } else if ("bannerImage" in updatedFormData && type === "voucherBanner") {
    updatedFormData.bannerImage = {
      name: "",
      photo: "",
      type: "",
      size: 0,
      file: null,
    };
  }
  return updatedFormData;
};
