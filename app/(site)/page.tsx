import Header from "@/components/Header";

export default function Home() {
  return (
    <div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-hidden'>
      <Header>
        <div className='mb-2'>
          <h1 className='text-white text-3xl text-semibold'>Welcome</h1>
          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4'></div>
        </div>
      </Header>
      <div className='mt-2 mb-7 px-6'></div>
    </div>
  );
}
