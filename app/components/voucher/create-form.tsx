"use client";

import { useState } from "react";
import { BrandData, ImageFileData, VoucherManagementData } from "@/types/app";
import LabeledInput from "../shared/labeled-input";
import LabeledTextarea from "../shared/labeled-textarea";
import LabeledSelect from "../shared/labeled-select";
import LabeledRadio from "../shared/labeled-radio";
import { FileUploader } from "../shared/file-uploader";

export default function Form() {
  const [formData, setFormData] = useState<{
    brand: BrandData;
    voucher: VoucherManagementData;
  }>({
    brand: {
      logo: { name: "", photo: "", type: "", size: 0, file: null },
      name: "",
      description: "",
      category: "groceries",
      status: "active",
    },
    voucher: {
      brandName: "",
      bannerImage: { name: "", photo: "", type: "", size: 0, file: null },
      discountPercentage: 0,
      expirationDate: "",
      FAQs: [{ question: "", answer: "" }],
      highlightsDescription: "",
      highlights: [{ title: "", text: "" }],
    },
  });

  const handleBrandChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    fieldname: string
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      brand: { ...formData.brand, [fieldname]: value },
    });
  };

  const handleVoucherChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      voucher: {
        ...formData.voucher,
        [name]: value,
      },
    });
  };

  const handleFAQChange = (
    index: number,
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    const FAQs = [...formData.voucher.FAQs];
    if (name === "question" || name === "answer") {
      FAQs[index][name] = value;
      setFormData({
        ...formData,
        voucher: {
          ...formData.voucher,
          FAQs,
        },
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
    const highlights = [...formData.voucher.highlights];
    if (name === "title" || name === "text") {
      highlights[index][name] = value;
      setFormData({
        ...formData,
        voucher: {
          ...formData.voucher,
          highlights,
        },
      });
    }
  };

  function uploadFiles(files: ImageFileData[], id: string) {
    const updatedFormData = { ...formData };
    const updatedBrand = { ...formData.brand };
    const updatedVoucher = { ...formData.voucher };

    files.forEach((file, index) => {
      if (index === 0) {
        if (id === "logo") {
          updatedBrand.logo = {
            name: file.name,
            photo: file.photo,
            type: file.type,
            size: file.size,
            file: file.file,
          };
        } else {
          updatedVoucher.bannerImage = {
            name: file.name,
            photo: file.photo,
            type: file.type,
            size: file.size,
            file: file.file,
          };
        }
      }
    });

    updatedFormData.brand = updatedBrand;
    updatedFormData.voucher = updatedVoucher;
    setFormData(updatedFormData);
  }

  function deleteFile(id: string) {
    const updatedFormData = { ...formData };
    if (id === "logo") {
      updatedFormData.brand.logo = {
        name: "",
        photo: "",
        type: "",
        size: 0,
        file: null,
      };
    } else {
      updatedFormData.voucher.bannerImage = {
        name: "",
        photo: "",
        type: "",
        size: 0,
        file: null,
      };
    }
    setFormData(updatedFormData);
  }

  const addFAQ = () => {
    setFormData({
      ...formData,
      voucher: {
        ...formData.voucher,
        FAQs: [...formData.voucher.FAQs, { question: "", answer: "" }],
      },
    });
  };

  const addHighlight = () => {
    setFormData({
      ...formData,
      voucher: {
        ...formData.voucher,
        highlights: [...formData.voucher.highlights, { title: "", text: "" }],
      },
    });
  };

  return (
    <form>
      {/* Brand Section */}
      <div className='rounded-md bg-gray-50 p-4 md:p-6'>
        <h3 className='text-2xl font-bold mb-4'>Brand Details: </h3>
        <div className='ml-4'>
          <FileUploader
            id='logo'
            label={"Select a logo file"}
            ownerLicense={[formData.brand.logo]}
            onUpload={uploadFiles}
            onDelete={deleteFile}
            count={1}
            formats={["jpg", "jpeg", "png"]}
          />
          <LabeledInput
            id='name'
            // disabled={isLoading}
            type='text'
            label={"Brand Name"}
            name='name'
            value={formData.brand.name}
            className='mt-1 block w-full rounded-md border-gray-300'
            onChange={(e) => handleBrandChange(e, "name")}
            required={true}
            placeholder='Brand Name'
          />
          <LabeledTextarea
            id='description'
            rows={4}
            placeholder='Write the description here...'
            label='Brand Description'
            name='description'
            required={true}
            value={formData.brand.description}
            onChange={(e) => handleBrandChange(e, "description")}
            // error={state.errors?.message} // Pass the error message from your form state
          />
          <LabeledSelect
            id='category'
            label='Choose category'
            defaultValue=''
            name='category'
            value={formData.brand.category}
            onChange={(e) => handleBrandChange(e, "category")}
            // error={state.errors?.customerId}
          >
            <option value='' disabled>
              Select a category
            </option>
            <option value='groceries'>Groceries</option>
            <option value='fashion'>Fashion</option>
            <option value='beauty'>Beauty</option>
            <option value='travel'>Travel</option>
          </LabeledSelect>

          <LabeledRadio
            id='status'
            name='status'
            label='Set the brand status'
            options={[
              { label: "Pending", value: "pending" },
              { label: "Paid", value: "paid" },
              { label: "Verified", value: "verified" },
            ]}
            value={formData.brand.status}
            // checked={formData.brand.status === "verified"}
            onChange={(e) => handleBrandChange(e, "status")}
            // onChange={handleBrandChange}
            // error={state.errors?.status}
          />
        </div>
      </div>
      <div className='rounded-md bg-gray-50 p-4 md:p-6'>
        <h3 className='text-2xl font-bold mb-4'>Voucher Management: </h3>
        <div className='ml-4'>
          <FileUploader
            id='banner'
            label={"Select a banner image file"}
            ownerLicense={[formData.voucher.bannerImage]}
            onUpload={uploadFiles}
            onDelete={deleteFile}
            count={1}
            formats={["jpg", "jpeg", "png"]}
          />
          <LabeledTextarea
            id='highlightsDescription'
            rows={4}
            placeholder='Write the description here...'
            label='Highlights Description: '
            name='highlightsDescription'
            required={true}
            value={formData.voucher.highlightsDescription}
            onChange={handleVoucherChange}
            // error={state.errors?.message} // Pass the error message from your form state
          />
          <LabeledInput
            id='discountPercentage'
            // disabled={isLoading}
            type='number'
            label={"Discount Percentage"}
            name='discountPercentage'
            value={formData.voucher.discountPercentage}
            className='mt-1 block w-full rounded-md border-gray-300'
            onChange={handleVoucherChange}
            required={true}
            placeholder='Discount Percentage'
          />
          <LabeledSelect
            id='brandName'
            label='Choose brand name'
            defaultValue=''
            name='brandName'
            value={formData.voucher.brandName}
            onChange={handleVoucherChange}
            // onChange={handleBrandChange}
            custom={true}
            // error={state.errors?.customerId}
          >
            <option value='' disabled>
              Select a category
            </option>
            <option value='groceries'>Groceries</option>
            <option value='fashion'>Fashion</option>
            <option value='beauty'>Beauty</option>
            <option value='travel'>Travel</option>
          </LabeledSelect>

          <LabeledInput
            id='expirationDate'
            // disabled={isLoading}
            type='datetime-local'
            label={"Expiration Date:"}
            name='expirationDate'
            value={formData.voucher.expirationDate}
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
            {formData.voucher.FAQs.map((faq, index) => (
              <div key={index} className='mb-2'>
                <LabeledInput
                  id='faq-question-index'
                  // disabled={isLoading}
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
            {formData.voucher.highlights.map((highlight, index) => (
              <div key={index} className='mb-2'>
                <LabeledInput
                  id='highlight-title-index'
                  // disabled={isLoading}
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
    </form>
  );
}
