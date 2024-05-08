"use client";

import useOutsideClick from "@/hooks/useOutsideClick";
import { useSessionContext } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaEllipsis } from "react-icons/fa6";

interface DropdownProps {
  brandId: string;
  voucherId?: string;
}

const Dropdown: FC<DropdownProps> = ({ brandId, voucherId }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { supabaseClient } = useSessionContext();

  useOutsideClick(dropdownRef, () => setOpen(false));

  const handleBrandDelete = async (id: string, type: "brands" | "vouchers") => {
    const { error } = await supabaseClient.from(type).delete().eq("id", id);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(
        `Deleted ${type === "brands" ? "Brand" : "Voucher"} Data Successfully`
      );
      router.refresh();
    }
  };

  return (
    <div ref={dropdownRef} className='hs-dropdown relative inline-flex'>
      <div
        className='flex align-middle justify-center gap-3 border border-gray-200 rounded-md p-2 py-2 cursor-pointer'
        onClick={() => setOpen(!open)}
      >
        <FaEllipsis className='h-[18px] w-[18px]' />
      </div>
      {open && (
        <div className='hs-dropdown-menu absolute right-1 transition-[opacity,margin] duration  min-w-40 bg-white shadow-md rounded-lg p-2 mt-2 divide-y divide-gray-200 z-50'>
          <div className='py-2 first:pt-0 last:pb-0'>
            <span className='block py-2 px-3 text-xs font-medium uppercase text-gray-400'>
              View
            </span>
            <Link
              href={`/dashboard/metadata/${brandId}`}
              className='flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100'
            >
              Metadata Details
            </Link>
            <span className='block py-2 px-3 text-xs font-medium uppercase text-gray-400'>
              Brand
            </span>
            <Link
              href={`/dashboard/metadata/${brandId}/edit`}
              className='flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100'
            >
              Edit
            </Link>
            <div
              className='cursor-pointer flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100'
              onClick={() => handleBrandDelete(brandId, "brands")}
            >
              Delete
            </div>
          </div>
          {voucherId && (
            <div className='py-2 first:pt-0 last:pb-0'>
              <span className='block py-2 px-3 text-xs font-medium uppercase text-gray-400'>
                Voucher
              </span>
              <Link
                className='flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100'
                href={`/dashboard/voucher/${voucherId}/edit`}
              >
                <svg
                  className='flex-shrink-0 size-4'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                >
                  <path d='M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9' />
                  <path d='M10.3 21a1.94 1.94 0 0 0 3.4 0' />
                </svg>
                Edit
              </Link>
              <div
                className='cursor-pointer flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100'
                onClick={() => handleBrandDelete(voucherId, "vouchers")}
              >
                Delete
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
