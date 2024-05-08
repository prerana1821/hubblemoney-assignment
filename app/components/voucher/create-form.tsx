"use client";

import { FormEvent, useState } from "react";
import { Brand, VoucherDataFromDB, VoucherFormState } from "@/types/app";
import LabeledInput from "../shared/labeled-input";
import LabeledTextarea from "../shared/labeled-textarea";
import LabeledSelect from "../shared/labeled-select";
import { FileUploader } from "../shared/file-uploader";
import {
  deleteFile,
  handleFormValidations,
  uploadFiles,
} from "@/app/utils/file-handling";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import uniqid from "uniqid";
import Link from "next/link";
import { Button } from "../shared/button";
import toast from "react-hot-toast";

const voucherFormInitialState: VoucherFormState = {
  brandName: { value: "", error: null },
  bannerImage: {
    name: "",
    photo: "",
    type: "",
    size: 0,
    file: null,
    error: null,
  },
  discountPercentage: { value: 0, error: null },
  expirationDate: { value: "", error: null },
  highlightsDescription: { value: "", error: null },
  FAQs: [{ question: "", answer: "", error: null }],
  highlights: [{ title: "", text: "", error: null }],
};

interface FromProps {
  brandNames: Brand[];
  voucher?: VoucherDataFromDB;
  bannerUrl?: string;
}

// TODO: Add remove highlight & FAQ

export default function Form({ brandNames, voucher, bannerUrl }: FromProps) {
  const [isLoading, setIsLoading] = useState(false);
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const [formData, setFormData] = useState<VoucherFormState>(
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
      [name]: { value },
    });
  };

  const handleFAQChange = (
    index: number,
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    const newFAQs = formData.FAQs.map((faq, i) =>
      i === index ? { ...faq, [name]: value } : faq
    );
    setFormData({
      ...formData,
      FAQs: newFAQs,
    });
  };

  const handleHighlightChange = (
    index: number,
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    const newHighlights = formData.highlights.map((highlight, i) =>
      i === index ? { ...highlight, [name]: value } : highlight
    );
    setFormData({
      ...formData,
      highlights: newHighlights,
    });
  };

  const addFAQ = () => {
    setFormData({
      ...formData,
      FAQs: [...formData.FAQs, { question: "", answer: "", error: null }],
    });
  };

  const addHighlight = () => {
    setFormData({
      ...formData,
      highlights: [
        ...formData.highlights,
        { title: "", text: "", error: null },
      ],
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

      const hasErrors = handleFormValidations(formData, setFormData, "voucher");

      if (hasErrors) {
        setIsLoading(false);
        return;
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

      const selectedBrandId = brandNames.find(
        (brand) => brand.name === formData.brandName.value
      );

      const { error: supabaseError } = await supabaseClient
        .from("vouchers")
        .insert({
          brand_id: selectedBrandId?.id,
          banner_path: bannerData.path,
          discount_percentage: formData.discountPercentage.value,
          expiration_date: formData.expirationDate.value,
          faq: JSON.stringify(
            formData.FAQs.map((faq) => ({
              question: faq.question,
              answer: faq.answer,
            }))
          ),
          highlights: JSON.stringify({
            description: formData.highlightsDescription,
            list: formData.highlights.map((highlight) => ({
              title: highlight.title,
              text: highlight.text,
            })),
          }),
        });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success("Voucher is added to the brand!");
      setFormData({
        ...voucherFormInitialState,
        FAQs: [{ question: "", answer: "", error: null }],
        highlights: [{ title: "", text: "", error: null }],
      });
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
              setFormData(updatedFormData as VoucherFormState);
            }}
            onDelete={() => {
              const updatedFormData = deleteFile("voucherBanner", formData);
              setFormData(updatedFormData as VoucherFormState);
            }}
            count={1}
            formats={["jpg", "jpeg", "png"]}
          />

          <LabeledInput
            id='discountPercentage'
            type='number'
            label={"Discount Percentage"}
            disabled={isLoading}
            name='discountPercentage'
            value={formData.discountPercentage.value}
            className='mt-1 block w-full rounded-md border-gray-300'
            onChange={handleVoucherChange}
            required={true}
            error={formData.discountPercentage.error}
            placeholder='Discount Percentage'
          />
          <LabeledSelect
            id='brandName'
            label='Choose brand name'
            name='brandName'
            value={formData.brandName.value}
            onChange={handleVoucherChange}
            disabled={isLoading}
            error={formData.brandName.error}
          >
            <option value='' disabled>
              Select a brand
            </option>
            {brandNames?.map((brand: Brand) => (
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
            value={formData.expirationDate.value}
            className='mt-1 block w-full rounded-md border-gray-300'
            onChange={handleVoucherChange}
            required={true}
            placeholder='Expiration Date:'
            error={formData.expirationDate.error}
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
                  min={5}
                />
                <LabeledTextarea
                  id='faq-answer'
                  rows={4}
                  placeholder='Write the answer here...'
                  label='Answer: '
                  name='answer'
                  minLength={5}
                  disabled={isLoading}
                  required={true}
                  value={faq.answer}
                  onChange={(e) => handleFAQChange(index, e)}
                />
                {faq.error && (
                  <div
                    id={`${index}-error`}
                    aria-live='polite'
                    aria-atomic='true'
                  >
                    <p className='mt-2 text-sm text-red-500'>{faq.error}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <LabeledTextarea
            id='highlightsDescription'
            rows={4}
            placeholder='Write the description here...'
            label='Highlights Description: '
            name='highlightsDescription'
            disabled={isLoading}
            required={true}
            value={formData.highlightsDescription.value}
            onChange={handleVoucherChange}
            error={formData.highlightsDescription.error}
          />
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
                  label={"Title"}
                  min={5}
                  name='title'
                  value={highlight.title}
                  className='mt-1 block w-full rounded-md border-gray-300'
                  onChange={(e) => handleHighlightChange(index, e)}
                  required={true}
                  placeholder='Title'
                />
                <LabeledTextarea
                  id='highlight-text'
                  rows={4}
                  placeholder='Write the description here...'
                  label='Description: '
                  name='text'
                  minLength={5}
                  disabled={isLoading}
                  required={true}
                  value={highlight.text}
                  onChange={(e) => handleHighlightChange(index, e)}
                />
                {highlight.error && (
                  <div
                    id={`${index}-error`}
                    aria-live='polite'
                    aria-atomic='true'
                  >
                    <p className='mt-2 text-sm text-red-500'>
                      {highlight.error}
                    </p>
                  </div>
                )}
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
        <Button type='submit' disabled={isLoading}>
          Add Brand Voucher
        </Button>
      </div>
    </form>
  );
}
