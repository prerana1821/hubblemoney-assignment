import { LoginContent } from "@/app/components/login/content";
import Header from "@/app/components/layout/header";
import Footer from "../components/layout/footer";

export default function LoginPage() {
  return (
    <main className='flex items-center justify-center md:h-screen p-6 mx-8'>
      <div className='relative mx-auto flex w-full flex-col space-y-2.5 p-4 md:-mt-20'>
        <Header />
        <h2 className='text-xl font-semibold text-center'>Login/Sign Up</h2>
        <LoginContent />
      </div>
    </main>
  );
}
