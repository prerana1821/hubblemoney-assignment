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
      logo: { name: "", photo: "", type: "", size: 0 },
      name: "",
      description: "",
      category: "groceries",
      status: "active",
    },
    voucher: {
      brandName: "",
      bannerImage: { name: "", photo: "", type: "", size: 0 },
      discountPercentage: 0,
      expirationDate: "",
      FAQs: [{ question: "", answer: "" }],
      highlightsDescription: "",
      highlights: [{ title: "", text: "" }],
    },
  });

  console.log({ formData });

  const handleBrandChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      brand: { ...formData.brand, [name]: value },
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

  function uploadFiles(files: ImageFileData[]) {
    //  const updatedFormData = { ...formData };
    //  const formDataToUpdate = new FormData();
    //  files.forEach((file, index) => {
    //    formDataToUpdate.append(`file${index}`, file);
    //  });
    //  // Update the brand logo in the form data
    //  formDataToUpdate.forEach((value, key) => {
    //    updatedFormData.brand.logo = {
    //      name: files[Number(key.slice(4))].name,
    //      photo: value.toString(),
    //      type: files[Number(key.slice(4))].type,
    //      size: files[Number(key.slice(4))].size,
    //    };
    //  });
    //  setFormData(updatedFormData);
  }

  function deleteFile() {
    const updatedFormData = { ...formData };
    updatedFormData.brand.logo = { name: "", photo: "", type: "", size: 0 };
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
          <LabeledInput
            id='name'
            // disabled={isLoading}
            type='text'
            label={"Brand Name"}
            name='name'
            value={formData.brand.name}
            className='mt-1 block w-full rounded-md border-gray-300'
            onChange={handleBrandChange}
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
            onChange={handleBrandChange}
            // error={state.errors?.message} // Pass the error message from your form state
          />
          <LabeledSelect
            id='category'
            label='Choose category'
            defaultValue=''
            name='category'
            value={formData.brand.category}
            onChange={handleBrandChange}
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
            onChange={handleBrandChange}
            // error={state.errors?.status}
          />
          <FileUploader
            label={"Select a logo file"}
            ownerLicense={[formData.brand.logo]}
            onUpload={uploadFiles}
            onDelete={deleteFile}
            count={1}
            formats={["jpg", "jpeg", "png"]}
          />
        </div>
      </div>
      <div className='rounded-md bg-gray-50 p-4 md:p-6'>
        <h3 className='text-2xl font-bold mb-4'>Voucher Management: </h3>
        <div className='ml-4'>
          <FileUploader
            label={"Select a banner image file"}
            ownerLicense={[formData.voucher.bannerImage]}
            onUpload={uploadFiles}
            onDelete={deleteFile}
            count={1}
            formats={["jpg", "jpeg", "png"]}
          />
          <LabeledTextarea
            id='highlights-description'
            rows={4}
            placeholder='Write the description here...'
            label='Highlights Description: '
            name='highlights-description'
            required={true}
            value={formData.voucher.highlightsDescription}
            onChange={handleVoucherChange}
            // error={state.errors?.message} // Pass the error message from your form state
          />
          <LabeledInput
            id='discount-percentage'
            // disabled={isLoading}
            type='number'
            label={"Discount Percentage"}
            name='discount-percentage'
            value={formData.voucher.discountPercentage}
            className='mt-1 block w-full rounded-md border-gray-300'
            onChange={handleVoucherChange}
            required={true}
            placeholder='Discount Percentage'
          />
          <LabeledSelect
            id='category'
            label='Choose category'
            defaultValue=''
            name='category'
            // value={formData.brand.category}
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
          {/* <label className='block mb-2'>
            Expiration Date:
            <input
              type='datetime-local'
              name='expirationDate'
              value={formData.voucher.expirationDate}
              className='mt-1 block w-full rounded-md border-gray-300'
              onChange={handleVoucherChange}
            />
          </label> */}
          <LabeledInput
            id='expiration-date'
            // disabled={isLoading}
            type='datetime-local'
            label={"Expiration Date:"}
            name='expiration-date'
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
                {/* <input
                  type='text'
                  name='question'
                  value={faq.question}
                  className='mt-1 block w-full rounded-md border-gray-300'
                  onChange={(e) => handleFAQChange(index, e)}
                /> */}
                <LabeledInput
                  id='faq-question-index'
                  // disabled={isLoading}
                  type='text'
                  label={"Question"}
                  name='faq-question-index'
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
                  name='faq-answer'
                  required={true}
                  value={faq.answer}
                  onChange={(e) => handleFAQChange(index, e)}
                  // error={state.errors?.message} // Pass the error message from your form state
                />
                {/* <textarea
                  name='answer'
                  value={faq.answer}
                  className='mt-1 block w-full rounded-md border-gray-300'
                  rows={2}
                  onChange={(e) => handleFAQChange(index, e)}
                ></textarea> */}
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
                {/* <input
                  type='text'
                  name='title'
                  value={highlight.title}
                  className='mt-1 block w-full rounded-md border-gray-300'
                  onChange={(e) => handleHighlightChange(index, e)}
                /> */}
                <LabeledInput
                  id='highlight-title-index'
                  // disabled={isLoading}
                  type='text'
                  label={"Question"}
                  name='highlight-title-index'
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
                  name='highlight-text'
                  required={true}
                  value={highlight.text}
                  onChange={(e) => handleHighlightChange(index, e)}
                  // error={state.errors?.message} // Pass the error message from your form state
                />
                {/* <textarea
                  name='text'
                  value={highlight.text}
                  className='mt-1 block w-full rounded-md border-gray-300'
                  rows={2}
                  onChange={(e) => handleHighlightChange(index, e)}
                ></textarea> */}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <div className='mb-4'>
          <label htmlFor='title' className='mb-2 block text-sm font-medium'>
            Title
          </label>
          <div className='relative mt-2 rounded-md'>
            <div className='relative'>
              <input
                id='title'
                name='title'
                type='text'
                step='0.01'
                placeholder='Enter Title'
                className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                aria-describedby='title-error'
              />
              <MdOutlinePersonOutline className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
            </div>
            <div id='title-error' aria-live='polite' aria-atomic='true'>
              {state.errors?.amount &&
                state.errors.amount.map((error: string) => (
                  <p className='mt-2 text-sm text-red-500' key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div> */}
      {/* <h2 className='text-lg font-semibold mb-2'>Brand</h2> */}
      {/* <label className='block mb-2'>
          Logo:
          <input
            type='file'
            name='logo'
            className='mt-1 block w-full'
            onChange={handleBrandChange}
          />
        </label> */}
      {/* <label
          htmlFor='helper-text'
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
        >
          Your email
        </label>
        <input
          type='email'
          id='helper-text'
          aria-describedby='helper-text-explanation'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='name@flowbite.com'
        />
        <p
          id='helper-text-explanation'
          className='mt-2 text-sm text-gray-500 dark:text-gray-400'
        >
          We’ll never share your details. Read our{" "}
          <a
            href='#'
            className='font-medium text-blue-600 hover:underline dark:text-blue-500'
          >
            Privacy Policy
          </a>
          .
        </p> */}
      {/* <label className='block mb-2'>
          Name:
          <input
            type='text'
            name='name'
            value={formData.brand.name}
            className='mt-1 block w-full rounded-md border-gray-300'
            onChange={handleBrandChange}
          />
          <Input
            id='name'
            // disabled={isLoading}
            type='text'
            name='name'
            value={formData.brand.name}
            className='mt-1 block w-full rounded-md border-gray-300'
            onChange={handleBrandChange}
            required={true}
            placeholder='Brand Name'
          />
        </label> */}
      {/* <label className='block mb-2'>
          Description:
          <textarea
            name='description'
            value={formData.brand.description}
            className='mt-1 block w-full rounded-md border-gray-300'
            rows={3}
            onChange={handleBrandChange}
          ></textarea>
        </label>
        <label className='block mb-2'>
          Category:
          <select
            name='category'
            value={formData.brand.category}
            className='mt-1 block w-full rounded-md border-gray-300'
            onChange={handleBrandChange}
          >
            <option value='groceries'>Groceries</option>
            <option value='fashion'>Fashion</option>
            <option value='beauty'>Beauty</option>
            <option value='travel'>Travel</option>
          </select>
        </label>
        <fieldset className='mb-2'>
          <legend className='block mb-1'>Status:</legend>
          <div className='space-y-2'>
            <label className='inline-flex items-center'>
              <input
                type='radio'
                name='status'
                value='active'
                checked={formData.brand.status === "active"}
                onChange={handleBrandChange}
                className='form-radio'
              />
              <span className='ml-2'>Active</span>
            </label>
            <label className='inline-flex items-center'>
              <input
                type='radio'
                name='status'
                value='inactive'
                checked={formData.brand.status === "inactive"}
                onChange={handleBrandChange}
                className='form-radio'
              />
              <span className='ml-2'>Inactive</span>
            </label>
            <label className='inline-flex items-center'>
              <input
                type='radio'
                name='status'
                value='verified'
                checked={formData.brand.status === "verified"}
                onChange={handleBrandChange}
                className='form-radio'
              />
              <span className='ml-2'>Verified</span>
            </label>
          </div>
        </fieldset> */}
      {/* </div> */}
      {/* Voucher Management Section */}
      {/* <div>
        <h2 className='text-lg font-semibold mb-2'>Voucher Management</h2>
        <label className='block mb-2'>
          Brand Name:
          <select
            name='brandName'
            value={formData.voucherManagement.brandName}
            className='mt-1 block w-full rounded-md border-gray-300'
            onChange={handleVoucherChange}
          >
          </select>
        </label>
        <label className='block mb-2'>
          Banner Image:
          <input
            type='file'
            name='bannerImage'
            className='mt-1 block w-full'
            onChange={handleVoucherChange}
          />
        </label>
        <label className='block mb-2'>
          Discount Percentage:
          <input
            type='number'
            name='discountPercentage'
            value={formData.voucherManagement.discountPercentage}
            className='mt-1 block w-full rounded-md border-gray-300'
            onChange={handleVoucherChange}
          />
        </label>
        <label className='block mb-2'>
          Expiration Date:
          <input
            type='datetime-local'
            name='expirationDate'
            value={formData.voucherManagement.expirationDate}
            className='mt-1 block w-full rounded-md border-gray-300'
            onChange={handleVoucherChange}
          />
        </label>
        <div className='mb-4'>
          <h3 className='text-lg font-semibold mb-2'>FAQs</h3>
          {formData.voucherManagement.FAQs.map((faq, index) => (
            <div key={index} className='mb-2'>
              <input
                type='text'
                name='question'
                value={faq.question}
                className='mt-1 block w-full rounded-md border-gray-300'
                onChange={(e) => handleFAQChange(index, e)}
              />
              <textarea
                name='answer'
                value={faq.answer}
                className='mt-1 block w-full rounded-md border-gray-300'
                rows={2}
                onChange={(e) => handleFAQChange(index, e)}
              ></textarea>
            </div>
          ))}
          <button
            type='button'
            onClick={addFAQ}
            className='bg-blue-500 text-white py-2 px-4 rounded'
          >
            Add FAQ
          </button>
        </div>
        <div>
          <h3 className='text-lg font-semibold mb-2'>Highlights</h3>
          {formData.voucherManagement.highlights.map((highlight, index) => (
            <div key={index} className='mb-2'>
              <input
                type='text'
                name='title'
                value={highlight.title}
                className='mt-1 block w-full rounded-md border-gray-300'
                onChange={(e) => handleHighlightChange(index, e)}
              />
              <textarea
                name='text'
                value={highlight.text}
                className='mt-1 block w-full rounded-md border-gray-300'
                rows={2}
                onChange={(e) => handleHighlightChange(index, e)}
              ></textarea>
            </div>
          ))}
          <button
            type='button'
            onClick={addHighlight}
            className='bg-blue-500 text-white py-2 px-4 rounded'
          >
            Add Highlight
          </button>
        </div>
      </div> */}
    </form>
  );
}
