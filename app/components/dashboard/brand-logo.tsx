"use client";

import useLoadImage from "@/hooks/useLoadImage";
import Image from "next/image";
import React from "react";

export const BrandLogo = ({
  brandName,
  brandLogoPath,
}: {
  brandName: string;
  brandLogoPath: string;
}) => {
  const imagePath = useLoadImage(brandLogoPath, "brands");

  return (
    <Image
      src={imagePath}
      className='rounded-full'
      width={30}
      height={30}
      alt={`${brandName}'s logo picture`}
    />
  );
};
