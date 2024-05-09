"use client";

import { FormEvent, useState } from "react";
import {
  BrandNames,
  FileType,
  VoucherDataFromDB,
  VoucherFormState,
} from "@/types/app";
import LabeledInput from "../shared/labeled-input";
import LabeledTextarea from "../shared/labeled-textarea";
import LabeledSelect from "../shared/labeled-select";
import FileUploader from "../shared/file-uploader";
import {
  deleteFile,
  handleFormValidations,
  uploadFile,
} from "@/app/utils/file-handling";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import uniqid from "uniqid";
import Link from "next/link";
import { Button } from "../shared/button";
import toast from "react-hot-toast";
import { formatToSupabaseDate } from "@/app/utils/string-manipulation";
import { FiDelete } from "react-icons/fi";
import { CiCalendarDate, CiDiscount1 } from "react-icons/ci";
import { MdOutlinePersonOutline } from "react-icons/md";
import { TbTextPlus } from "react-icons/tb";
import { GrCircleQuestion } from "react-icons/gr";
import { MdOutlineTitle } from "react-icons/md";
import { PiTextAaBold } from "react-icons/pi";
import {
  addFAQ,
  addHighlight,
  handleFAQChange,
  handleFormSubmit,
  handleHighlightChange,
  handleVoucherChange,
  removeFAQ,
  removeHighlight,
  voucherFormInitialState,
} from "@/app/utils/voucher-form-handling";

interface FromProps {
  brandNames: BrandNames[];
  voucher?: VoucherDataFromDB;
  bannerUrl?: string;
}

export default function Form({ brandNames, voucher, bannerUrl }: FromProps) {
  const [isLoading, setIsLoading] = useState(false);
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  let deafultEditVoucherFormState: VoucherFormState = {} as VoucherFormState;

  if (voucher) {
    deafultEditVoucherFormState = {
      bannerImage: {
        name: "",
        photo: "",
        type: "",
        size: 0,
        file: null,
        path: bannerUrl,
        error: null,
      },
      brandName: { value: voucher?.brand.name, error: null },
      discountPercentage: { value: voucher?.discountPercentage, error: null },
      expirationDate: {
        value: formatToSupabaseDate(voucher?.expirationDate),
        error: null,
      },
      highlightsDescription: {
        value: voucher?.highlightsDescription,
        error: null,
      },
      FAQs: voucher.FAQs.map((faq) => ({ ...faq, error: null })),
      highlights: voucher?.highlights.map((highlight) => ({
        ...highlight,
        error: null,
      })),
    };
  }

  const [formData, setFormData] = useState<VoucherFormState>(
    voucher ? deafultEditVoucherFormState : voucherFormInitialState
  );

  return (
    <form
      onSubmit={(event) =>
        handleFormSubmit({
          event,
          supabaseClient,
          router,
          setIsLoading,
          formData,
          setFormData,
          brandNames,
          voucher,
        })
      }
    >
      <div className='rounded-md bg-gray-50 p-4 md:p-6'>
        <h3 className='text-2xl font-bold mb-4'>Voucher Management: </h3>
        <div className='ml-4'>
          <FileUploader
            id='banner'
            label={"Select a banner image file"}
            ownerLicense={[formData.bannerImage]}
            onUpload={(rawfiles) => {
              const updatedFormData = uploadFile(
                rawfiles[0],
                FileType.VoucherBanner,
                formData
              );
              setFormData(updatedFormData as VoucherFormState);
            }}
            onDelete={() => {
              const updatedFormData = deleteFile(
                FileType.VoucherBanner,
                formData
              );
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
            icon={CiDiscount1}
            name='discountPercentage'
            value={formData.discountPercentage.value}
            className='mt-1 block w-full rounded-md border-gray-300'
            onChange={(e) => handleVoucherChange(e, setFormData)}
            required={true}
            error={formData.discountPercentage.error}
            placeholder='Discount Percentage'
          />
          <LabeledSelect
            id='brandName'
            label='Choose brand name'
            name='brandName'
            icon={MdOutlinePersonOutline}
            value={formData.brandName.value}
            onChange={(e) => handleVoucherChange(e, setFormData)}
            disabled={isLoading || !!voucher}
            error={formData.brandName.error}
          >
            <option value='' disabled>
              Select a brand
            </option>
            {brandNames?.map((brand: BrandNames) => (
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
            icon={CiCalendarDate}
            value={formData.expirationDate.value}
            className='mt-1 block w-full rounded-md border-gray-300'
            onChange={(e) => handleVoucherChange(e, setFormData)}
            required={true}
            placeholder='Expiration Date:'
            error={formData.expirationDate.error}
          />

          <h3 className='text-lg font-semibold my-6'>Highlights</h3>
          <LabeledTextarea
            id='highlightsDescription'
            rows={4}
            placeholder='Write the description here...'
            label='Highlights Description: '
            icon={TbTextPlus}
            name='highlightsDescription'
            disabled={isLoading}
            required={true}
            value={formData.highlightsDescription.value}
            onChange={(e) => handleVoucherChange(e, setFormData)}
            error={formData.highlightsDescription.error}
          />
          <div>
            <div className='flex flex-row justify-between align-middle'>
              <h3 className='text-md font-medium mb-2'>
                Add Highlight Details
              </h3>
              <button
                type='button'
                onClick={() => addHighlight(setFormData)}
                className='bg-blue-500 text-white py-2 px-4 rounded'
              >
                Add Highlight
              </button>
            </div>
            {formData.highlights.map((highlight, index) => (
              <div key={index} className='relative mt-4 mb-2'>
                <button
                  className='absolute top-1 right-1'
                  onClick={() => removeHighlight(index, setFormData)}
                >
                  <FiDelete className='w-4' />
                </button>
                <LabeledInput
                  id='highlight-title-index'
                  disabled={isLoading}
                  type='text'
                  label={"Title"}
                  min={5}
                  name='title'
                  icon={MdOutlineTitle}
                  value={highlight.title}
                  className='mt-1 block w-full rounded-md border-gray-300'
                  onChange={(e) =>
                    handleHighlightChange(index, e, formData, setFormData)
                  }
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
                  icon={TbTextPlus}
                  required={true}
                  value={highlight.text}
                  onChange={(e) =>
                    handleHighlightChange(index, e, formData, setFormData)
                  }
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
          <div className='mb-4'>
            <div className='flex flex-row justify-between align-middle'>
              <h3 className='text-lg font-semibold mb-2'>FAQs</h3>{" "}
              <button
                type='button'
                onClick={() => addFAQ(setFormData)}
                className='bg-blue-500 text-white py-2 px-4 rounded'
              >
                Add FAQ
              </button>
            </div>
            {formData.FAQs.map((faq, index) => (
              <div key={index} className='relative mt-4 mb-2'>
                <button
                  className='absolute top-1 right-1'
                  onClick={() => removeFAQ(index, setFormData)}
                >
                  <FiDelete className='w-4' />
                </button>
                <LabeledInput
                  id='faq-question-index'
                  disabled={isLoading}
                  type='text'
                  label={"Question"}
                  name='question'
                  value={faq.question}
                  className='mt-1 block w-full rounded-md border-gray-300'
                  onChange={(e) =>
                    handleFAQChange(index, e, formData, setFormData)
                  }
                  required={true}
                  icon={GrCircleQuestion}
                  placeholder='Question'
                  min={5}
                />
                <LabeledTextarea
                  id='faq-answer'
                  rows={4}
                  placeholder='Write the answer here...'
                  label='Answer: '
                  name='answer'
                  icon={PiTextAaBold}
                  minLength={5}
                  disabled={isLoading}
                  required={true}
                  value={faq.answer}
                  onChange={(e) =>
                    handleFAQChange(index, e, formData, setFormData)
                  }
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
          {voucher ? "Update" : "Add"} Brand Voucher
        </Button>
      </div>
    </form>
  );
}
