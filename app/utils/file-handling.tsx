import {
  BrandFormState,
  FormType,
  FormValidationData,
  ImageFileData,
  VoucherFormState,
} from "@/types/app";
import { Dispatch, SetStateAction } from "react";
import { isDate } from "./string-manipulation";

type FormData = BrandFormState | VoucherFormState;

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
          error: null,
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
      error: null,
    };
  }
  return updatedFormData;
};

// export const handleFormValidations = (
//   formData: BrandFormState | VoucherFormState,
//   setFormData:
//     | Dispatch<SetStateAction<BrandFormState>>
//     | Dispatch<SetStateAction<VoucherFormState>>,
//   type: "brand" | "voucher"
// ) => {
//   let updatedState = { ...formData };
//   let error = false;

//   if (type === "brand") {
//     const { name, description, category, status } = updatedState;

//     if (name.value?.length < 3) {
//       updatedState.name.error = "Brand Name cannot be less than 3 characters";
//       error = true;
//     }
//     if (description.value?.length < 3) {
//       updatedState.description.error =
//         "Description cannot be less than 3 characters";
//       error = true;
//     }

//     if (!category?.value) {
//       updatedState.category.error = "Category cannot be empty";
//       error = true;
//     }
//     if (!status?.value) {
//       updatedState.status.error = "Status cannot be empty";
//       error = true;
//     }
//   } else if (type === "voucher") {
//     const {
//       brandName,
//       discountPercentage,
//       expirationDate,
//       highlightsDescription,
//     } = updatedState;

//     if (brandName.value?.length < 3) {
//       updatedState.brandName.error = "Brand Name cannot be empty.";
//       error = true;
//     }

//     if (discountPercentage.value <= 0) {
//       updatedState.discountPercentage.error = "Discount Percentage cannot be 0";
//       error = true;
//     }

//     if (isDate(expirationDate.value)) {
//       updatedState.expirationDate.error = "Category cannot be empty";
//       error = true;
//     }

//     if (!highlightsDescription?.value) {
//       updatedState.highlightsDescription.error =
//         "Highlights Description cannot be empty";
//       error = true;
//     }
//   }

//   setFormData({
//     ...formData,
//     ...updatedState,
//   });
//   return error;
// };

type FormState = BrandFormState | VoucherFormState;

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
      highlights,
      FAQs,
    } = updatedState as VoucherFormState;

    // console.log({
    //   brandName,
    //   discountPercentage,
    //   expirationDate,
    //   highlightsDescription,
    //   highlights,
    //   FAQs,
    // });

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
