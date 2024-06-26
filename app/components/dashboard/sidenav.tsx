"use client";

import Link from "next/link";
import NavLinks from "@/app/components/dashboard/nav-links";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";
import { IoPower } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SideNav() {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    router.push("/");

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged Out!");
    }
  };

  return (
    <div className='flex h-full flex-col px-3 py-4 md:px-2'>
      <Link
        className='mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40'
        href='/'
      >
        <div className='w-32 text-white md:w-40'>
          <Link href='/' className='self-center'>
            <Image
              src='/logo-name.png'
              width={100}
              height={70}
              alt='Hubble Money Logo'
            />
          </Link>
        </div>
      </Link>
      <div className='flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2'>
        <NavLinks />
        <div className='hidden h-auto w-full grow rounded-md bg-gray-50 md:block'></div>

        <button
          className='flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'
          onClick={handleLogout}
        >
          <IoPower className='w-6' />
          <div className='hidden md:block'>Sign Out</div>
        </button>
      </div>
    </div>
  );
}
