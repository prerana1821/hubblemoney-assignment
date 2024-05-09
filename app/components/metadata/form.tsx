"use client";

import { useState } from "react";
import { BrandDataFromDB, BrandFormState, FileType } from "@/types/app";
import LabeledInput from "@/app/components/shared/labeled-input";
import LabeledTextarea from "@/app/components/shared/labeled-textarea";
import LabeledSelect from "@/app/components/shared/labeled-select";
import LabeledRadio from "@/app/components/shared/labeled-radio";
import FileUploader from "@/app/components/shared/file-uploader";
import { Button } from "@/app/components/shared/button";
import { deleteFile, uploadFile } from "@/app/utils/file-handling";
import { BRAND_STATUS, CATEGORIES } from "@/app/utils/constants";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MdOutlinePersonOutline } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { TbTextPlus } from "react-icons/tb";
import {
  defaultAddBrandFormState,
  handleBrandChange,
  handleFormSubmit,
} from "@/app/utils/metadata-form-handling";

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

  return (
    <form
      onSubmit={(event) =>
        handleFormSubmit({
          event,
          supabaseClient,
          router,
          setIsLoading,
          brand,
          formData,
          setFormData,
        })
      }
    >
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
            onChange={(e) => handleBrandChange(e, setFormData)}
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
            onChange={(e) => handleBrandChange(e, setFormData)}
            icon={TbTextPlus}
            value={formData.description.value}
            error={formData.description.error}
          />
          <LabeledSelect
            id='category'
            label='Choose category'
            name='category'
            value={formData.category.value}
            onChange={(e) => handleBrandChange(e, setFormData)}
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
            onChange={(e) => handleBrandChange(e, setFormData)}
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
