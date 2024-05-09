import Link from "next/link";
import Image from "next/image";
import Footer from "@/app/components/layout/footer";
import NavigateToDashboard from "@/app/components/login/buttons";
import Header from "../components/layout/header";

export default async function Page() {
  return (
    <div className='flex min-h-screen flex-col p-6 mx-8'>
      <Header />
      <div className='mt-4 flex grow flex-col gap-4 md:flex-row'>
        <div className='flex flex-col justify-center gap-4 rounded-lg bg-gray-50 px-4 py-10 md:w-2/5 md:px-20'>
          <Image
            src='/logo.png'
            width={50}
            height={50}
            alt='Hubble Money Logo'
          />
          <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Hubble Money Brand Management Dashboard.</strong>{" "}
          </p>
          <NavigateToDashboard />
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
