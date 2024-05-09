import { formatDateToLocal } from "@/app/utils/string-manipulation";
import useLoadImage from "@/hooks/useLoadImage";
import { FAQ, VoucherDataFromDB, VoucherManagementData } from "@/types/app";
import Image from "next/image";
import React from "react";

const VoucherCard = ({ voucher }: { voucher: VoucherDataFromDB }) => {
  console.log({ voucher });

  return (
    <div className=' overflow-hidden flex flex-col'>
      <div className='flex flex-row '>
        <div className='relative w-1/3 mt-8 p-6'>
          <Image
            src={voucher.banner_path}
            alt='Banner'
            width={250}
            height={200}
            className='w-full h-full object-cover'
          />
        </div>
        <div className='flex flex-col justify-center align-middle px-4 py-2 w-2/3'>
          <h2 className='text-lg font-semibold text-gray-600 mt-2'>
            {voucher?.brand.category}
          </h2>
          <h1 className='text-3xl font-semibold text-gray-800 mt-2'>
            {voucher?.brand.name}
          </h1>

          <div className='mt-4 flex items-center'>
            <span className='text-lg font-bold'>
              <p className=' text-wrap'>
                Discount: {voucher?.discountPercentage}% Off
              </p>
            </span>
          </div>
          <div className='rounded-tr-lg mt-4'>
            <span>Expires on {formatDateToLocal(voucher?.expirationDate)}</span>
          </div>
        </div>
      </div>

      <div className='p-6'>
        <h2 className='text-2xl font-bold mb-4'>Highlights</h2>
        <p className='text-gray-700 mb-6'>{voucher?.highlightsDescription}</p>
        <div className='grid grid-cols-2 gap-4 mb-6'>
          {voucher.highlights?.map((highlight, index) => (
            <div key={index} className='bg-gray-100 p-4 rounded-lg'>
              <h3 className='text-lg font-semibold mb-2'>{highlight.title}</h3>
              <p className='text-gray-700'>{highlight.text}</p>
            </div>
          ))}
        </div>
        <h2 className='text-2xl font-bold mb-4'>FAQs</h2>
        <div className='space-y-4'>
          {voucher.FAQs?.map((faq, index) => (
            <div key={index} className='bg-gray-100 p-4 rounded-lg'>
              <h3 className='text-lg font-semibold mb-2'>{faq.question}</h3>
              <p className='text-gray-700'>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VoucherCard;
