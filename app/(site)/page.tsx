import Link from "next/link";
import Image from "next/image";
import Footer from "@/app/components/layout/footer";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Page() {
  return (
    <div className='flex min-h-screen flex-col p-6'>
      <div className='flex items-end rounded-lg bg-blue-500 p-4 md:h-48'>
        <Link href='/' className='md:pl-10 md:pb-5'>
          <Image
            src='/logo.png'
            width={240}
            height={84}
            alt='Hubble Money Logo'
          />
        </Link>
      </div>
      <div className='mt-4 flex grow flex-col gap-4 md:flex-row'>
        <div className='flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20'>
          <div className='h-0 w-0 border-b-[30px] border-l-[20px] border-r-[20px] border-b-black border-l-transparent border-r-transparent' />
          <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Hubble Money Brand Management Dashboard.</strong>{" "}
          </p>
          <Link
            href='/login'
            className='flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base'
          >
            <span>Log in</span> <FaArrowRightLong className='w-5 md:w-6' />
          </Link>
        </div>
        <div className='flex items-center justify-center md:w-3/5'>
          <Image
            src='/hero-desktop.png'
            width={1400}
            height={760}
            className='hidden md:block'
            alt='Screenshots of the dashboard project showing desktop version'
          />
          <Image
            src='/hero-mobile.png'
            width={560}
            height={620}
            className='block md:hidden'
            alt='Screenshots of the dashboard project showing desktop version'
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
