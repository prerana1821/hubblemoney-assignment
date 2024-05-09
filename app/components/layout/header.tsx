import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className='flex justify-between align-middle  '>
      <Link href='/' className='self-center'>
        <Image
          src='/logo-name.png'
          width={100}
          height={70}
          alt='Hubble Money Logo'
        />
      </Link>
      <Link href='https://www.myhubble.money/'>
        <button className='relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'>
          <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-black  rounded-md group-hover:bg-opacity-0'>
            Go to website
          </span>
        </button>
      </Link>
    </div>
  );
};

export default Header;
