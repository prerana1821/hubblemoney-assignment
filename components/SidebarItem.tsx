import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC } from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface SidebarItemProps {
  href: string;
  active: boolean;
  label: string;
  icon: IconType;
}

const SidebarItem: FC<SidebarItemProps> = ({
  href,
  active,
  label,
  icon: Icon,
}) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      about={label}
      className={twMerge(
        `flex flex-row h-auto items-center w-full gap-x-4 text-md font-medium cur hover:text-white transition text-neutral-400 py-1`,
        active ? "text-white" : ""
      )}
    >
      <Icon size={26} />
      <p className='truncate w-full'> {label}</p>
    </Link>
  );
};

export default SidebarItem;
