import { LoginContent } from "@/app/components/login/content";
import Header from "@/app/components/layout/header";
import Footer from "../components/layout/footer";

export default function LoginPage() {
  return (
    <div className='flex flex-col items-center justify-center p-6 mx-8'>
      <Header />
      <div className='relative mx-auto flex w-full flex-col space-y-2.5 '>
        <h2 className='text-xl font-semibold text-center my-8'>
          Login/Sign Up
        </h2>
        <LoginContent />
      </div>
      <Footer />
    </div>
  );
}
