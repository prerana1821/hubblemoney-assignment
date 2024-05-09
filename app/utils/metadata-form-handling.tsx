import {
  BrandDataFromDB,
  BrandFormState,
  HandleFormSubmitParams,
} from "@/types/app";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import toast from "react-hot-toast";
import uniqid from "uniqid";
import { handleFormValidations } from "./file-handling";
import { SupabaseClient } from "@supabase/supabase-js";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const defaultAddBrandFormState: BrandFormState = {
  logo: { name: "", photo: "", type: "", size: 0, file: null, error: null },
  name: { value: "", error: null },
  description: { value: "", error: null },
  category: { value: "One stop shop", error: null },
  status: { value: "Active", error: null },
};

export const handleBrandChange = (
  event: ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >,
  setFormData: Dispatch<SetStateAction<BrandFormState>>
) => {
  const { name, value } = event.target;
  setFormData((prevFormData) => ({
    ...prevFormData,
    [name]: { value },
  }));
};

export const handleFormSubmit = async ({
  event,
  setIsLoading,
  formData,
  setFormData,
  supabaseClient,
  router,
  brand,
}: HandleFormSubmitParams) => {
  event.preventDefault();

  try {
    setIsLoading(true);

    if (!formData.logo?.file && formData.logo.path === "") {
      setIsLoading(false);
      return toast.error("Missing logo file");
    }

    const hasErrors = handleFormValidations(formData, setFormData, "brand");

    if (hasErrors) {
      setIsLoading(false);
      return;
    }

    const uniqueID = uniqid();
    let logoData;

    if (!formData.logo.path || formData.logo.path.length === 0) {
      const { data: _logoData, error: logoError } = await supabaseClient.storage
        .from("logos")
        .upload(
          `logo-${formData.logo.name}-${uniqueID}`,
          formData.logo.file as File,
          {
            cacheControl: "3600",
            upsert: false,
          }
        );

      if (logoError) {
        console.error({ logoError });
        setIsLoading(false);
        return toast.error("Failed logo upload.");
      }

      logoData = _logoData;
    }

    if (brand) {
      const { error: supabaseEditError } = await supabaseClient
        .from("brands")
        .upsert({
          id: brand?.id,
          name: formData.name.value,
          description: formData.description.value,
          category: formData.category.value,
          status: formData.status.value,
          ...(formData.logo.path ? {} : { logo_path: logoData?.path }),
        });

      if (supabaseEditError) {
        setIsLoading(false);
        return toast.error(
          `Error updating the brand: ${supabaseEditError.message}`
        );
      } else {
        toast.success("Brand Metadata is updated successfully.");
        router.push("/dashboard");
      }
    } else {
      const { error: supabaseInsertError } = await supabaseClient
        .from("brands")
        .insert({
          name: formData.name.value,
          description: formData.description.value,
          category: formData.category.value,
          logo_path: logoData?.path,
          status: formData.status.value,
        });

      if (supabaseInsertError) {
        setIsLoading(false);
        return toast.error(
          `Error inserting the brand: ${supabaseInsertError.message}`
        );
      } else {
        toast.success("Brand Metadata is added!");
        router.push("/dashboard/voucher/create");
      }
    }

    router.refresh();
    setIsLoading(false);
    setFormData(defaultAddBrandFormState);
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
  } finally {
    setIsLoading(false);
  }
};
