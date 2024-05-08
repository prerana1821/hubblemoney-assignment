"use client";

import { FormEvent, useState } from "react";
import { BrandData, BrandDataFromDB } from "@/types/app";
import LabeledInput from "../shared/labeled-input";
import LabeledTextarea from "../shared/labeled-textarea";
import LabeledSelect from "../shared/labeled-select";
import LabeledRadio from "../shared/labeled-radio";
import { FileUploader } from "../shared/file-uploader";
import { Button } from "../shared/button";
import { deleteFile, uploadFiles } from "@/app/utils/file-handling";
import { BRAND_STATUS, CATEGORIES } from "@/app/utils/constants";
import Link from "next/link";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { redirect, useRouter } from "next/navigation";
import uniqid from "uniqid";
import toast from "react-hot-toast";

const brandFormInitialState: BrandData = {
  logo: { name: "", photo: "", type: "", size: 0, file: null },
  name: "",
  description: "",
  category: "One stop shop",
  status: "Active",
};

export default function Form({
  brand,
  logoUrl,
}: {
  brand?: BrandDataFromDB;
  logoUrl?: string;
}) {
  let brandEditFormInitialState: BrandData = {} as BrandData;

  if (brand) {
    brandEditFormInitialState = {
      logo: {
        name: "",
        photo: "",
        type: "",
        size: 0,
        file: null,
        path: logoUrl,
      },
      name: brand?.name,
      description: brand?.description,
      category: brand?.category,
      status: brand?.status,
    };
  }

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<BrandData>(
    brand ? brandEditFormInitialState : brandFormInitialState
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
      [name]: value,
    });
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      if (!formData.logo?.file) {
        setIsLoading(false);
        return toast.error("Missing logo file");
      }

      const uniqueID = uniqid();

      // TODO: delete image from storage if edit form

      const { data: logoData, error: logoError } = await supabaseClient.storage
        .from("logos")
        .upload(`logo-${formData.logo.name}-${uniqueID}`, formData.logo.file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (logoError) {
        console.error({ logoError });

        setIsLoading(false);
        return toast.error("Failed logo upload.");
      }

      if (brand) {
        const { error: supabaseEditError } = await supabaseClient
          .from("brands")
          .upsert({
            id: brand?.id,
            name: formData.name,
            description: formData.description,
            category: formData.category,
            logo_path: logoData.path,
            status: formData.status,
          });

        if (supabaseEditError) {
          setIsLoading(false);
          return toast.error(
            `Error updating the brand: ${supabaseEditError.message}`
          );
        } else {
          toast.success("Brand Metadata is updated successfully.");
          redirect("/dashboard");
        }
      } else {
        const { error: supabaseInsertError } = await supabaseClient
          .from("brands")
          .insert({
            name: formData.name,
            description: formData.description,
            category: formData.category,
            logo_path: logoData.path,
            status: formData.status,
          });

        if (supabaseInsertError) {
          setIsLoading(false);
          return toast.error(
            `Error inserting the brand: ${supabaseInsertError.message}`
          );
        } else {
          toast.success("Brand Metadata is added!");
        }
      }

      router.refresh();
      setIsLoading(false);
      setFormData(brandFormInitialState);
    } catch (error) {
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
              const updatedFormData = uploadFiles(
                rawfiles,
                "brandLogo",
                formData
              );
              setFormData(updatedFormData as BrandData);
            }}
            onDelete={() => {
              const updatedFormData = deleteFile("brandLogo", formData);
              setFormData(updatedFormData as BrandData);
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
            value={formData.name}
            className='mt-1 block w-full rounded-md border-gray-300'
            onChange={(e) => handleBrandChange(e)}
            required={true}
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
            value={formData.description}
            onChange={handleBrandChange}
            // error={state.errors?.message} // Pass the error message from your form state
          />
          <LabeledSelect
            id='category'
            label='Choose category'
            name='category'
            value={formData.category}
            onChange={handleBrandChange}
            disabled={isLoading}
            // error={state.errors?.customerId}
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
            value={formData.status}
            disabled={isLoading}
            onChange={handleBrandChange}
            // error={state.errors?.status}
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
        <Button type='submit'>Add Brand Metadata</Button>
      </div>
    </form>
  );
}
