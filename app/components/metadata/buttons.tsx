import Link from "next/link";
import { IoIosAddCircleOutline } from "react-icons/io";

export function CreateBrandData() {
  return (
    <Link
      href='/dashboard/metadata/create'
      className='flex max-w-fit h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
    >
      <span className='hidden md:block'>Add Brand Metadata</span>{" "}
      <IoIosAddCircleOutline className='h-5 md:ml-4' />
    </Link>
  );
}
