"use client";

import Link from "next/link";
import { Fragment } from "react";
import { usePathname } from "next/navigation";
import { Title, Collapse } from "rizzui";
import { cn } from "@/utils/class-names";
import { PiCaretDownBold } from "react-icons/pi";
import SimpleBar from "@/components/ui/simplebar";
import { menuItems } from "@/layouts/hydrogen/menu-items";
import { SidebarMenu } from "./sidebar-menu";

export default function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  return (
    <aside
      className={cn(
        "fixed bottom-0 start-0 z-50 h-full w-[270px] border-e-2 border-gray-100 bg-white 2xl:w-72 dark:bg-gray-100/50",
        className
      )}
    >
      <div className="sticky top-0 z-40 bg-gray-0/10 px-6 pb-5 pt-5 2xl:px-8 2xl:pt-6 dark:bg-gray-100/5">
        <Link
          href={"/"}
          aria-label="Site Logo"
          className="text-gray-800 hover:text-gray-900"
        >
          <Title>LOGO</Title>
        </Link>
      </div>

      <SimpleBar className="h-[calc(100%-80px)]">
        <SidebarMenu/>
      </SimpleBar>
    </aside>
  );
}
