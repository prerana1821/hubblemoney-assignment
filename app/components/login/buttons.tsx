"use client";

import useUser from "@/hooks/useUser";
import Link from "next/link";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const NavigateToDashboard = () => {
  const { accessToken } = useUser();

  return (
    <Link
      //   href='/login'
      href={accessToken ? "/dashboard" : "/login"}
      className='flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base'
    >
      {/* <span>Log in</span> */}
      <span>{accessToken ? "Dashboard" : "Log in"}</span>{" "}
      <FaArrowRightLong className='w-5 md:w-6' />
    </Link>
  );
};

export default NavigateToDashboard;
