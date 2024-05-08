import {
  BrandData,
  BrandFormState,
  ImageFileData,
  VoucherManagementData,
} from "@/types/app";
import { Dispatch, SetStateAction } from "react";

type FormData = BrandFormState | VoucherManagementData;

export const uploadFiles = (
  files: ImageFileData[],
  type: "brandLogo" | "voucherBanner",
  formData: FormData
) => {
  const updatedFormData = { ...formData };

  console.log(22, { updatedFormData });

  files.forEach((file, index) => {
    if (index === 0) {
      if ("logo" in updatedFormData && type === "brandLogo") {
        updatedFormData.logo = {
          name: file.name,
          photo: file.photo,
          type: file.type,
          size: file.size,
          file: file.file,
          path: "",
          error: null,
        };
      } else if ("bannerImage" in updatedFormData && type === "voucherBanner") {
        updatedFormData.bannerImage = {
          name: file.name,
          photo: file.photo,
          type: file.type,
          size: file.size,
          file: file.file,
          path: "",
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
      path: "",
      error: null,
    };
  } else if ("bannerImage" in updatedFormData && type === "voucherBanner") {
    updatedFormData.bannerImage = {
      name: "",
      photo: "",
      type: "",
      size: 0,
      file: null,
      path: "",
    };
  }
  return updatedFormData;
};

export const handleFormValidations = (
  formData: BrandFormState,
  setFormData: Dispatch<SetStateAction<BrandFormState>>
) => {
  let updatedState = { ...formData };
  let error = false;

  const { name, description, category, status } = updatedState;

  if (name.value?.length < 3) {
    updatedState.name.error = "Brand Name cannot be less than 3 characters";
    error = true;
  }
  if (description.value?.length < 3) {
    updatedState.description.error =
      "Description cannot be less than 3 characters";
    error = true;
  }

  if (!category?.value) {
    updatedState.category.error = "Category cannot be empty";
    error = true;
  }
  if (!status?.value) {
    updatedState.status.error = "Status cannot be empty";
    error = true;
  }

  setFormData({
    ...formData,
    ...updatedState,
  });
  return error;
};
