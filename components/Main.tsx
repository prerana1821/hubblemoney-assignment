"use client";

import { usePathname } from "next/navigation";
import { FC, ReactNode, useMemo } from "react";
import { HiHome } from "react-icons/hi";
import Box from "./shared/Box";
import SidebarItem from "./SidebarItem";

interface MainProps {
  children: ReactNode;
}

const Main: FC<MainProps> = ({ children }) => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        href: "/",
        active: pathname === "/",
        label: "Home",
        icon: HiHome,
      },
    ],
    [pathname]
  );

  return (
    <div className='flex h-full'>
      <aside className='hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2'>
        <Box>
          <nav className='flex flex-col gap-y-4 px-4 py-4'>
            {routes.map((route) => (
              <SidebarItem key={route.label} {...route} />
            ))}
          </nav>
        </Box>
      </aside>
      <main className='h-full flex-1 overflow-y-auto py-2'>{children}</main>
    </div>
  );
};

export default Main;
