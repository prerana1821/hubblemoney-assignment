"use client";

import { FormEvent, useState } from "react";
import { Brand, VoucherManagementData } from "@/types/app";
import LabeledInput from "../shared/labeled-input";
import LabeledTextarea from "../shared/labeled-textarea";
import LabeledSelect from "../shared/labeled-select";
import LabeledRadio from "../shared/labeled-radio";
import { FileUploader } from "../shared/file-uploader";
import { deleteFile, uploadFiles } from "@/app/utils/file-handling";
import toast from "react-hot-toast";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import uniqid from "uniqid";
import Link from "next/link";
import { Button } from "../shared/button";

const voucherFormInitialState: VoucherManagementData = {
  brandName: "",
  bannerImage: { name: "", photo: "", type: "", size: 0, file: null },
  discountPercentage: 0,
  expirationDate: "",
  FAQs: [{ question: "", answer: "" }],
  highlightsDescription: "",
  highlights: [{ title: "", text: "" }],
};

export default function Form({ brands }: { brands: Brand[] }) {
  const [isLoading, setIsLoading] = useState(false);
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const [formData, setFormData] = useState<VoucherManagementData>(
    voucherFormInitialState
  );

  const handleVoucherChange = (
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

  const handleFAQChange = (
    index: number,
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    const FAQs = [...formData.FAQs];
    if (name === "question" || name === "answer") {
      FAQs[index][name] = value;
      setFormData({
        ...formData,
        FAQs,
      });
    }
  };

  const handleHighlightChange = (
    index: number,
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    const highlights = [...formData.highlights];
    if (name === "title" || name === "text") {
      highlights[index][name] = value;
      setFormData({
        ...formData,
        highlights,
      });
    }
  };

  const addFAQ = () => {
    setFormData({
      ...formData,
      FAQs: [...formData.FAQs, { question: "", answer: "" }],
    });
  };

  const addHighlight = () => {
    setFormData({
      ...formData,
      highlights: [...formData.highlights, { title: "", text: "" }],
    });
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      if (!formData.bannerImage?.file) {
        setIsLoading(false);
        return toast.error("Missing Banner Image File.");
      }

      const uniqueID = uniqid();

      const { data: bannerData, error: bannerError } =
        await supabaseClient.storage
          .from("banners")
          .upload(
            `banner-${formData.bannerImage.name}-${uniqueID}`,
            formData.bannerImage.file,
            {
              cacheControl: "3600",
              upsert: false,
            }
          );

      if (bannerError) {
        console.error({ bannerError });
        setIsLoading(false);
        return toast.error("Failed Banner Image upload.");
      }

      const selectedBrandId = brands.find(
        (brand) => brand.name === formData.brandName
      );

      const { error: supabaseError } = await supabaseClient
        .from("vouchers")
        .insert({
          brand_id: selectedBrandId?.id,
          banner_path: bannerData.path,
          discount_percentage: formData.discountPercentage,
          expiration_date: formData.expirationDate,
          faq: JSON.stringify(formData.FAQs),
          highlights: JSON.stringify({
            description: formData.highlightsDescription,
            list: formData.highlights,
          }),
        });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success("Brand Metadata is added!");
      setFormData(voucherFormInitialState);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className='rounded-md bg-gray-50 p-4 md:p-6'>
        <h3 className='text-2xl font-bold mb-4'>Voucher Management: </h3>
        <div className='ml-4'>
          <FileUploader
            id='banner'
            label={"Select a banner image file"}
            ownerLicense={[formData.bannerImage]}
            onUpload={(rawfiles) => {
              const updatedFormData = uploadFiles(
                rawfiles,
                "voucherBanner",
                formData
              );
              setFormData(updatedFormData as VoucherManagementData);
            }}
            onDelete={() => {
              const updatedFormData = deleteFile("voucherBanner", formData);
              setFormData(updatedFormData as VoucherManagementData);
            }}
            count={1}
            formats={["jpg", "jpeg", "png"]}
          />
          <LabeledTextarea
            id='highlightsDescription'
            rows={4}
            placeholder='Write the description here...'
            label='Highlights Description: '
            name='highlightsDescription'
            disabled={isLoading}
            required={true}
            value={formData.highlightsDescription}
            onChange={handleVoucherChange}
            // error={state.errors?.message} // Pass the error message from your form state
          />
          <LabeledInput
            id='discountPercentage'
            type='number'
            label={"Discount Percentage"}
            disabled={isLoading}
            name='discountPercentage'
            value={formData.discountPercentage}
            className='mt-1 block w-full rounded-md border-gray-300'
            onChange={handleVoucherChange}
            required={true}
            placeholder='Discount Percentage'
          />
          <LabeledSelect
            id='brandName'
            label='Choose brand name'
            name='brandName'
            value={formData.brandName}
            onChange={handleVoucherChange}
            disabled={isLoading}
            // error={state.errors?.customerId}
          >
            <option value='' disabled>
              Select a brand
            </option>
            {brands?.map((brand: Brand) => (
              <option value={brand.name} key={brand.id}>
                {brand.name}
              </option>
            ))}
          </LabeledSelect>

          <LabeledInput
            id='expirationDate'
            disabled={isLoading}
            type='datetime-local'
            label={"Expiration Date:"}
            name='expirationDate'
            value={formData.expirationDate}
            className='mt-1 block w-full rounded-md border-gray-300'
            onChange={handleVoucherChange}
            required={true}
            placeholder='Expiration Date:'
          />
          <div className='mb-4'>
            <div className='flex flex-row justify-between align-middle'>
              <h3 className='text-lg font-semibold mb-2'>FAQs</h3>{" "}
              <button
                type='button'
                onClick={addFAQ}
                className='bg-blue-500 text-white py-2 px-4 rounded'
              >
                Add FAQ
              </button>
            </div>
            {formData.FAQs.map((faq, index) => (
              <div key={index} className='mb-2'>
                <LabeledInput
                  id='faq-question-index'
                  disabled={isLoading}
                  type='text'
                  label={"Question"}
                  name='question'
                  value={faq.question}
                  className='mt-1 block w-full rounded-md border-gray-300'
                  onChange={(e) => handleFAQChange(index, e)}
                  required={true}
                  placeholder='Question'
                />
                <LabeledTextarea
                  id='faq-answer'
                  rows={4}
                  placeholder='Write the answer here...'
                  label='Answer: '
                  name='answer'
                  disabled={isLoading}
                  required={true}
                  value={faq.answer}
                  onChange={(e) => handleFAQChange(index, e)}
                  // error={state.errors?.message} // Pass the error message from your form state
                />
              </div>
            ))}
          </div>
          <div>
            <div className='flex flex-row justify-between align-middle'>
              <h3 className='text-lg font-semibold mb-2'>Highlights</h3>
              <button
                type='button'
                onClick={addHighlight}
                className='bg-blue-500 text-white py-2 px-4 rounded'
              >
                Add Highlight
              </button>
            </div>
            {formData.highlights.map((highlight, index) => (
              <div key={index} className='mb-2'>
                <LabeledInput
                  id='highlight-title-index'
                  disabled={isLoading}
                  type='text'
                  label={"Question"}
                  name='title'
                  value={highlight.title}
                  className='mt-1 block w-full rounded-md border-gray-300'
                  onChange={(e) => handleHighlightChange(index, e)}
                  required={true}
                  placeholder='Question'
                />
                <LabeledTextarea
                  id='highlight-text'
                  rows={4}
                  placeholder='Write the description here...'
                  label='Description: '
                  name='text'
                  disabled={isLoading}
                  required={true}
                  value={highlight.text}
                  onChange={(e) => handleHighlightChange(index, e)}
                  // error={state.errors?.message} // Pass the error message from your form state
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='mt-6 flex justify-end gap-4'>
        <Link
          href='/dashboard/voucher'
          className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'
        >
          Cancel
        </Link>
        <Button type='submit'>Add Brand Voucher</Button>
      </div>
    </form>
  );
}
