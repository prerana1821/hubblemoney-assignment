import {
  BrandFormState,
  FileType,
  FormState,
  ImageFileData,
  VoucherFormState,
} from "@/types/app";
import { Dispatch, SetStateAction } from "react";
import { isDate } from "./string-manipulation";

export const uploadFile = (
  file: ImageFileData,
  type: FileType,
  formData: FormState
): FormState => {
  const updatedFormData = { ...formData };
  const field = type === FileType.BrandLogo ? "logo" : "bannerImage";

  (updatedFormData as any)[field] = {
    name: file.name,
    photo: file.photo,
    type: file.type,
    size: file.size,
    file: file.file,
    path: "",
    error: null,
  };

  return updatedFormData;
};

export const deleteFile = (type: FileType, formData: FormState): FormState => {
  const updatedFormData = { ...formData };
  const field = type === FileType.BrandLogo ? "logo" : "bannerImage";

  (updatedFormData as any)[field] = {
    name: "",
    photo: "",
    type: "",
    size: 0,
    file: null,
    path: "",
    error: null,
  };

  return updatedFormData;
};

export const handleFormValidations = <T extends FormState>(
  formData: T,
  setFormData: Dispatch<SetStateAction<T>>,
  type: "brand" | "voucher"
): boolean => {
  let updatedState = { ...formData };
  let error = false;

  if (type === "brand") {
    const { name, description, category, status } =
      updatedState as BrandFormState;

    if (name.value.length < 3) {
      name.error = "Brand Name cannot be less than 3 characters";
      error = true;
    }
    if (description.value.length < 3) {
      description.error = "Description cannot be less than 3 characters";
      error = true;
    }

    if (!category?.value) {
      category.error = "Category cannot be empty";
      error = true;
    }
    if (!status?.value) {
      status.error = "Status cannot be empty";
      error = true;
    }
  } else if (type === "voucher") {
    const {
      brandName,
      discountPercentage,
      expirationDate,
      highlightsDescription,
    } = updatedState as VoucherFormState;

    if (brandName.value.length < 3) {
      brandName.error = "Brand Name cannot be empty.";
      error = true;
    }

    if (discountPercentage.value <= 0) {
      discountPercentage.error = "Discount Percentage cannot be 0";
      error = true;
    }

    if (!isDate(expirationDate.value)) {
      expirationDate.error = "Expiration Date is invalid";
      error = true;
    }

    if (
      !highlightsDescription?.value ||
      highlightsDescription.value.length < 5
    ) {
      highlightsDescription.error =
        "Highlights Description cannot be empty or less than 5 characters";
      error = true;
    }
  }

  setFormData({
    ...formData,
    ...updatedState,
  });
  return error;
};
