"use client";

import { FormEvent, useState } from "react";
import { BrandDataFromDB, BrandFormState, FileType } from "@/types/app";
import LabeledInput from "../shared/labeled-input";
import LabeledTextarea from "../shared/labeled-textarea";
import LabeledSelect from "../shared/labeled-select";
import LabeledRadio from "../shared/labeled-radio";
import { FileUploader } from "../shared/file-uploader";
import { Button } from "../shared/button";
import {
  deleteFile,
  handleFormValidations,
  uploadFile,
} from "@/app/utils/file-handling";
import { BRAND_STATUS, CATEGORIES } from "@/app/utils/constants";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import uniqid from "uniqid";
import Link from "next/link";
import { MdOutlinePersonOutline } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { TbTextPlus } from "react-icons/tb";

const defaultAddBrandFormState: BrandFormState = {
  logo: { name: "", photo: "", type: "", size: 0, file: null, error: null },
  name: { value: "", error: null },
  description: { value: "", error: null },
  category: { value: "One stop shop", error: null },
  status: { value: "Active", error: null },
};

export default function Form({
  brand,
  logoUrl,
}: {
  brand?: BrandDataFromDB;
  logoUrl?: string;
}) {
  let deafultEditBrandFormState: BrandFormState = {} as BrandFormState;

  if (brand) {
    deafultEditBrandFormState = {
      logo: {
        name: "",
        photo: "",
        type: "",
        size: 0,
        file: null,
        path: logoUrl,
        error: null,
      },
      name: { value: brand?.name, error: null },
      description: { value: brand?.description, error: null },
      category: { value: brand?.category, error: null },
      status: { value: brand?.status, error: null },
    };
  }

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<BrandFormState>(
    brand ? deafultEditBrandFormState : defaultAddBrandFormState
  );
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const handleBrandChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: { value },
    });
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

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
      // TODO: delete image from storage if edit form

      if (!formData.logo.path || formData.logo.path.length === 0) {
        const { data: _logoData, error: logoError } =
          await supabaseClient.storage
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

  return (
    <form onSubmit={handleFormSubmit}>
      <div className='rounded-md bg-gray-50 p-4 md:p-6'>
        <h3 className='text-2xl font-bold mb-4'>Brand Details: </h3>
        <div className='ml-4'>
          <FileUploader
            id='logo'
            label={"Select a logo file"}
            ownerLicense={[formData.logo]}
            onUpload={(rawfiles) => {
              const updatedFormData = uploadFile(
                rawfiles[0],
                FileType.BrandLogo,
                formData
              );
              setFormData(updatedFormData as BrandFormState);
            }}
            onDelete={() => {
              const updatedFormData = deleteFile(FileType.BrandLogo, formData);
              setFormData(updatedFormData as BrandFormState);
            }}
            count={1}
            formats={["jpg", "jpeg", "png"]}
          />
          <LabeledInput
            id='name'
            disabled={isLoading}
            type='text'
            label={"Brand Name"}
            name='name'
            value={formData.name.value}
            className='mt-1 block w-full rounded-md border-gray-300'
            onChange={(e) => handleBrandChange(e)}
            required={true}
            error={formData.name.error}
            icon={MdOutlinePersonOutline}
            placeholder='Brand Name'
          />
          <LabeledTextarea
            id='description'
            rows={4}
            disabled={isLoading}
            placeholder='Write the description here...'
            label='Brand Description'
            name='description'
            required={true}
            onChange={handleBrandChange}
            icon={TbTextPlus}
            value={formData.description.value}
            error={formData.description.error}
          />
          <LabeledSelect
            id='category'
            label='Choose category'
            name='category'
            value={formData.category.value}
            onChange={handleBrandChange}
            icon={BiCategoryAlt}
            disabled={isLoading}
            error={formData.category.error}
          >
            <option value='' disabled>
              Select a category
            </option>
            {CATEGORIES.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </LabeledSelect>

          <LabeledRadio
            id='status'
            name='status'
            label='Set the brand status'
            options={BRAND_STATUS.map((status) => ({
              label: status,
              value: status,
            }))}
            value={formData.status.value}
            disabled={isLoading}
            onChange={handleBrandChange}
            error={formData.status.error}
          />
        </div>
      </div>
      <div className='mt-6 flex justify-end gap-4'>
        <Link
          href='/dashboard/metadata'
          className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'
        >
          Cancel
        </Link>
        <Button type='submit' disabled={isLoading}>
          {brand ? "Update" : "Add"} Brand Metadata
        </Button>
      </div>
    </form>
  );
}
