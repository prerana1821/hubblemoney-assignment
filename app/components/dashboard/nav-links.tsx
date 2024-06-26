"use client";

import { LuHome } from "react-icons/lu";
import Link from "next/link";
import { BsDatabaseCheck } from "react-icons/bs";
import { usePathname } from "next/navigation";
import { BsCreditCard2Front } from "react-icons/bs";
import clsx from "clsx";

const links = [
  { name: "Home", href: "/dashboard", icon: LuHome },
  {
    name: "Brand Metadata",
    href: "/dashboard/metadata",
    icon: BsDatabaseCheck,
  },
  {
    name: "Voucher Management",
    href: "/dashboard/voucher",
    icon: BsCreditCard2Front,
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              { "bg-sky-100 text-blue-600": pathname === link.href }
            )}
          >
            <LinkIcon className='w-6' />
            <p className='hidden md:block'>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
