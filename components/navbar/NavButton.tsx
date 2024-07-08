"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
const NavButton = ({ name, path }: { name: string; path: string }) => {
  const pathName = usePathname();
  return (
    <Link
      href={path}
      className={`flexcenter font-medium  group px-5 max-lg:px-8 py-3 rounded-lg relative  ${
        path == pathName && "text-minor  bg-neutral-200/25 "
      }  overflow-x-hidden text-sm  hover:opacity-90  hover:text-minor transition  gap-1`}
    >
      <p className=" text-lg max-lg:text-base">{name}</p>
    </Link>
  );
};
export default NavButton;
