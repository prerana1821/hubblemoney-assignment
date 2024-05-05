"use client";

import { FaUserAlt } from "react-icons/fa";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { FC, ReactNode } from "react";
import { Button } from "./shared/Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import useUser from "@/hooks/useUser";
import toast from "react-hot-toast";

interface HeaderProps {
  children: ReactNode;
  className?: string;
}

export const Header: FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();
  const { onOpen } = useAuthModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged Out!");
    }
  };

  return (
    <div
      className={twMerge(
        `
        h-fit 
        bg-gradient-to-b
        from-emerald-800
        p-6
    `,
        className
      )}
    >
      <div
        className='
            w-full
            mb-4
            flex
            items-center
            justify-between
        '
      >
        <div className='hidden md:flex gap-x-2 items-center'>
          <Button
            onClick={() => router.back()}
            className='rounded-full bg-black flex items-center justify-center hover:opacity-75 transition'
          >
            <RxCaretLeft className='text-white' size={35} />
          </Button>
          <Button
            onClick={() => router.forward()}
            className='rounded-full bg-black flex items-center justify-center hover:opacity-75 transition'
          >
            <RxCaretRight className='text-white' size={35} />
          </Button>
        </div>
        <div className='flex md:hidden gap-x-2 items-center'>
          <Button
            onClick={() => router.push("/")}
            className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition'
          >
            <HiHome className='text-black' size={20} />
          </Button>
          <Button
            onClick={() => router.push("/search")}
            className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition'
          >
            <BiSearch className='text-black' size={20} />
          </Button>
        </div>
        <div className='flex justify-between items-center gap-x-4'>
          {user ? (
            <div
              className='
                    flex
                    gap-x-4 
                    items-center
                    '
            >
              <Button className='bg-white px-6 py-2' onClick={handleLogout}>
                Logout
              </Button>
              <Button
                onClick={() => router.push("/account")}
                className='bg-white'
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  className='bg-transparent text-neutral-300 font-medium'
                  onClick={() => onOpen()}
                >
                  Sign Up
                </Button>
              </div>
              <div>
                <Button className='bg-white px-6 py-2' onClick={() => onOpen()}>
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
