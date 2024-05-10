"use client";

import { FC, useRef, useState } from "react";
import Link from "next/link";
import useOutsideClick from "@/hooks/useOutsideClick";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaEllipsis } from "react-icons/fa6";
import { LuLayoutPanelLeft } from "react-icons/lu";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";

interface DropdownProps {
  brandId: string;
  voucherId?: string;
}

const Dropdown: FC<DropdownProps> = ({ brandId, voucherId }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
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

  const calculateDropdownPosition = () => {
    if (dropdownRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const bottomSpace = windowHeight - dropdownRect.bottom;
      const isSpaceBelow = bottomSpace >= dropdownRect.height;
      return isSpaceBelow ? "bottom-0" : "top-0";
    }
    return "";
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
        <div
          className={`hs-dropdown-menu absolute right-1 transition-[opacity,margin] duration min-w-40 bg-white shadow-md rounded-lg p-2 mt-2 divide-y divide-gray-200 z-50 ${calculateDropdownPosition()}`}
        >
          <div className='py-2 first:pt-0 last:pb-0'>
            <span className='block py-2 px-3 text-xs font-medium uppercase text-gray-400'>
              Brand
            </span>
            <Link
              href={`/dashboard/metadata/${brandId}`}
              className='flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100'
            >
              <LuLayoutPanelLeft />
              View
            </Link>
            <Link
              href={`/dashboard/metadata/${brandId}/edit`}
              className='flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100'
            >
              <FaRegEdit />
              Edit
            </Link>
            <div
              className='cursor-pointer flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100'
              onClick={() => handleBrandDelete(brandId, "brands")}
            >
              <AiOutlineDelete />
              Delete
            </div>
          </div>
          {voucherId && (
            <div className='py-2 first:pt-0 last:pb-0'>
              <span className='block py-2 px-3 text-xs font-medium uppercase text-gray-400'>
                Voucher
              </span>
              <Link
                href={`/dashboard/voucher/${voucherId}`}
                className='flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100'
              >
                <LuLayoutPanelLeft />
                View
              </Link>
              <Link
                className='flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100'
                href={`/dashboard/voucher/${voucherId}/edit`}
              >
                <FaRegEdit />
                Edit
              </Link>
              <div
                className='cursor-pointer flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100'
                onClick={() => handleBrandDelete(voucherId, "vouchers")}
              >
                <AiOutlineDelete />
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
