"use client";
import Link from "next/link";
import Image from "next/image";
import { useMediaQuery } from "usehooks-ts";
import Links from "./Links";
import UserHandler from "../UserHandler";
import MainNav from "../sheets/MainNav";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/themeButton";
import { Suspense } from "react";

const NavBar = ({ userData }: { userData: UserFetched | null }) => {
  const matches = useMediaQuery("(min-width:1024px)") || false;

  return (
    <div
      className="z-50 px-20 max-lg:px-4 overflow-y-visible max-lg:bottom-0 !fixed py-6
          backdrop-blur-lg bg-background/80
          transition-all 
        shadow-foreground/20 shadow-md
        w-full  left-0 mx-auto  max-lg:rounded-t-lg lg:rounded-b-lg p-2"
    >
      <div className="flex h-full  max-md:!justify-center  justify-between items-center">
        <Link
          className="h-[55px] min-w-[55px] relative mr-8 max-lg:mr-2 "
          href="/"
        >
          <Image
            loading="eager"
            alt="logo"
            className=" object-contain"
            fill
            src={"/assets/logo.svg"}
          />
        </Link>{" "}
        {matches && (
          <div className="max-lg:hidden">
            <Links />
          </div>
        )}
        <div
          className="flex gap-[1.25rem]  max-md:!justify-center 
           max-lg:flex-row-reverse max-lg:justify-start items-center w-full lg:justify-end"
        >
          <div
            className="flex items-center justify-end gap-3
             max-md:w-full max-md:max-w-sm mx-3 lg:min-w-[150px]"
          >
            <Suspense>
              {matches ? (
                <div className="md:min-w-[90px] max-md:w-full ">
                  <UserHandler userData={userData} />
                </div>
              ) : (
                <MainNav />
              )}
            </Suspense>

            <Button className="max-lg:hidden">
              <ModeToggle />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
